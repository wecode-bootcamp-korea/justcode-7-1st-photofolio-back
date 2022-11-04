const { json } = require('express');
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

    // feed 글쓴이에 대한 팔로워 정보
    let followInfo = await myDataSource.query(
      `
      SELECT
        u.*,
        JSON_OBJECT(
          "follower_cnt", COUNT(f.follower_id)
        ) as follower_cnt,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "follower_id", f.follower_id,
            "follwer_name", u2.nickname
          )
        ) as followerInfo    
      from Follow f
      left join Users u on u.id = f.following_id
      left join Works_Posting wp on u.id = wp.user_id
      left join Users u2 on u2.id = f.follower_id
      where wp.id = 10
      `
    );

    followInfo = [...followInfo].map(item => {
      return {
        ...item,
        followerCnt: JSON.parse(item.follower_cnt),
        followerInfo: JSON.parse(item.followerInfo),
      };
    });

    let result = { feedWithTags, followInfo };
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { feed };
