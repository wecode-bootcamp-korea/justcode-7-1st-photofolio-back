const { DataSource } = require('typeorm');
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
});

// 카테고리별 총 게시물 수 + 최신 feed list
const worksList = async () => {
  try {
    const categorySortCountList = await myDataSource.query(
      `
    SELECT wc.id, wc.category_name, wc.eng_category_name, count(*) category_cnt 
    FROM Works_Category wc 
    LEFT JOIN Works_Posting wp 
    ON wc.id = wp.category_id 
    GROUP BY wc.id
    `
    );

    const worksFeedList = await myDataSource.query(
      `
      with tables1 as (
        select wp.id as id, COUNT(*) as comment_cnt FROM Works_Posting wp 
        join Comment c on wp.id = c.posting_id 
        GROUP BY wp.id 
      ), tables2 as (
        SELECT wp.id as id, COUNT(*) as sympathy_cnt from Works_Posting wp 
        join Works_Sympathy_Count wsc on wp.id = wsc.posting_id 
        left join Works_Sympathy ws on wsc.sympathy_id = ws.id 
        GROUP BY wp.id 
      ), tables3 as (
        select id, posting_id, upload_url as img_url from upload_file
        WHERE (posting_id, id) 
        IN (select posting_id, MAX(id) from upload_file WHERE file_sort_id = 1 group by posting_id ) 
      ) 
    
      SELECT wp.id, u.nickname, u.profile_image,  c.img_url, wp.title, IFNULL(a.comment_cnt, '0'), IFNULL(b.sympathy_cnt, '0'), wp.view_count, SUBSTRING(wp.created_at,1,10) as created_at
      from Works_Posting wp 
      left join Users u on wp.user_id = u.id 
      left JOIN tables3 c on c.posting_id = wp.id
      left join tables1 a on a.id = wp.id 
      left JOIN tables2 b on b.id = wp.id 
      ORDER BY wp.created_at DESC 
      `
    );
    let result = { categorySortCountList, worksFeedList };
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// feed 상세
const feed = async feed_id => {
  try {
    // feed 정보와 사용자 정보 + 태그 카운트 + 태그 배열
    let feedWithTags = await myDataSource.query(
      `
      SELECT
      	wp.*, ps.status, 
        JSON_OBJECT(
          "user_nickname", u.nickname,
          "user_profile_image", u.profile_image
        ) as userInfo,
	      COUNT(wpt.id) as tag_cnt,
        JSON_ARRAYAGG(
          JSON_OBJECT(
                "tag_name", wtn.name
          )
        ) as tagInfo
      from Works_Posting wp
      join Users u on wp.user_id = u.id
      join public_status ps on wp.status_id = ps.id
      join Works_Category wc on wc.id = wp.category_id
      left join Works_Posting_tags wpt  ON wp.id = wpt.posting_id
      left join Works_tag_names wtn on wpt.tag_id = wtn.id
      where wp.id = 7
    `
    );

    feedWithTags = [...feedWithTags].map(item => {
      return {
        ...item,
        userInfo: JSON.parse(item.userInfo),
        tagInfo: JSON.parse(item.tagInfo),
      };
    });

    // feed 글쓴이의 다른 작품들
    let moreFeedinfo = await myDataSource.query(
      `
      with tables1 as (
        select id, posting_id, upload_url as img_url from upload_file
        WHERE (posting_id, id) 
        IN (select posting_id, MAX(id) from upload_file WHERE file_sort_id = 1 group by posting_id ) 
      ), tables2 as (
        SELECT * from Works_Posting wp 
        WHERE wp.id = 14
      )
      
      SELECT 
          JSON_OBJECT(
          "user_feed_cnt", COUNT(wp.id)
        ) as user_feed_cnt,
        JSON_ARRAYAGG(
          JSON_OBJECT(
                "id", wp.id,
                "title", wp.title,
                "img_url", a.img_url
              )
        ) as more_feed
      from Works_Posting wp   
      left JOIN tables1 a on a.id = wp.id 
      left join tables2 b on b.user_id = wp.user_id 
      WHERE wp.user_id = b.user_id
      `
    );
    moreFeedinfo = [...moreFeedinfo].map(item => {
      return {
        user_feed_cnt: JSON.parse(item.user_feed_cnt),
        more_feed: JSON.parse(item.more_feed),
      };
    });

    // feed 글쓴이에 대한 팔로워 정보
    let followInfo = await myDataSource.query(
      `
      SELECT
      u.id, u.login_id, u.kor_name, u.eng_name, u.profile_image, u.nickname,  
      JSON_OBJECT(
        "follower_cnt", COUNT(f.follower_id)
      ) as follower_cnt,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "follower_id", f.follower_id,
          "follwer_name", u2.nickname
        )
      ) as followerInfo
      from Works_Posting wp
      right join Users u on u.id = wp.user_id
  	  RIGHT join Follow f on f.following_id = u.id  
      left join Users u2 on u2.id = f.follower_id
      where wp.id = 14
      `
    );

    followInfo = [...followInfo].map(item => {
      return {
        ...item,
        followerCnt: JSON.parse(item.follower_cnt),
        followerInfo: JSON.parse(item.followerInfo),
      };
    });

    // feed + 공감별 개수
    let sympathySortCount = await myDataSource.query(
      `
      SELECT ws.sympathy_sort, COUNT(wsc.id) as sympathy_cnt
      from Works_Sympathy_Count wsc 
      left JOIN Works_Sympathy ws on ws.id  = wsc.sympathy_id 
      left join Users u on u.id = wsc.user_id 
      left join Works_Posting wp ON wsc.posting_id = wp.id 
      where wp.id = 7
      GROUP by ws.sympathy_sort 
      `
    );

    // feed + 총 공감수
    let sympathyCount = await myDataSource.query(
      `
      SELECT COUNT(*)
      from Works_Sympathy_Count wsc 
      left JOIN Works_Sympathy ws on ws.id  = wsc.sympathy_id 
      left join Users u on u.id = wsc.user_id 
      left join Works_Posting wp ON wsc.posting_id = wp.id 
      where wp.id = 7
      GROUP by wp.id
      `
    );

    let result = {
      feedWithTags,
      moreFeedinfo,
      followInfo,
      sympathyCount,
      sympathySortCount,
    };
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { worksList, feed };