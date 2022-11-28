const { DataSource } = require('typeorm');
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource.initialize();

// 카테고리별 피드 리스트 - 1.fashion 2.pattern 3.travel 4.animal

// TODO - 11 
const CATEGORY_TYPE = {
  fashion: 1,
  pattern: 2,
  travel: 3,
  animal: 4
}

const categoryList = async categoryName => {
  // TODO - 12 
  // - throw : 각 에러가 터지는 곳
  // - error catch in diverse files may cause users to be confused
  let result = await myDataSource.query(
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
    SELECT wp.id, c.img_url, wc.category_name, wc.eng_category_name, u.kor_name as nickname, wp.title, 
      IFNULL(a.comment_cnt, '0') as comment_cnt, IFNULL(b.sympathy_cnt, '0') as sympathy_cnt, 
      wp.view_count, SUBSTRING(wp.created_at,1,10) created_at
    from Works_Posting wp 
    join Users u on wp.user_id = u.id 
    left join Works_Category wc ON wp.category_id = wc.id 
    left join tables1 a on a.id = wp.id 
    left JOIN tables2 b on b.id = wp.id 
    LEFT JOIN tables3 c on c.posting_id = wp.id
    WHERE wc.category_id = '${CATEGORY_TYPE[categoryName]}'
    ORDER BY wp.created_at DESC   
    `
  );
  return result;
};

// tag별 피드 개수
const tagCount = async () => {
    const result = await myDataSource.query(
      `
      SELECT wtn.id, wtn.name, COUNT(DISTINCT(wpt.id)) tag_cnt 
      FROM Works_Posting_tags wpt 
      JOIN Works_tag_names wtn ON wpt.tag_id = wtn.id 
      GROUP BY wtn.id 
      `
    );
    return result;
};

module.exports = {
  tagCount,
  categoryList,
};
