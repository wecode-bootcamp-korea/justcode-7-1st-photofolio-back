const { DataSource, SimpleConsoleLogger } = require('typeorm');
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource.initialize();

const channel = async (following_id, user_id) => {
  // let loggedIn_userInfo = [];
  // loggedIn_userInfo[0] = { loggedIn_id };
  let userInfo = await myDataSource.query(
    `
    select id as user_id, nickname, kor_name, eng_name, email, profile_image from users where id ='${following_id}'
    `
  );
  let userFollowingInfo = await myDataSource.query(
    `
    SELECT COUNT(follow.following_id) as following_cnt, 
    JSON_ARRAYAGG(
      JSON_OBJECT(
      "follower_id", follow.follower_id,
      "following_id", follow.following_id
        )
      ) as following_info
  from follow
  where follow.following_id = '${following_id}'
    `
  );
  let userFollowerInfo = await myDataSource.query(`
  SELECT COUNT(follow.follower_id) as follower_cnt, 
  JSON_ARRAYAGG(
    JSON_OBJECT(
    "following_id", follow.following_id,
    "follower_id", follow.follower_id
      )
    ) as follower_info
from follow
where follow.follower_id = '${following_id}'`);

  let usersPosts = await myDataSource.query(
    `      with tables1 as (
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
    SELECT wp.id, wp.user_id, u.nickname, u.profile_image,  c.img_url, wp.title, 
      IFNULL(a.comment_cnt, '0') comment_cnt, IFNULL(b.sympathy_cnt, '0') sympathy_cnt, wp.view_count, SUBSTRING(wp.created_at,1,10) as created_at
    from Works_Posting wp 
    left join Users u on wp.user_id = u.id 
    left JOIN tables3 c on c.posting_id = wp.id
    left join tables1 a on a.id = wp.id 
    left JOIN tables2 b on b.id = wp.id 
    where wp.user_id = '${following_id}'
    ORDER BY wp.id DESC`
  );
  let result = {
    // loggedIn_userInfo,
    userInfo,
    userFollowingInfo,
    userFollowerInfo,
    usersPosts,
  };
  return result;
};

module.exports = {
  channel,
};
