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

module.exports = { worksList };
