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

// 카테고리별 총 게시물 수
const categoryCount = async () => {
  try {
    const categoryAllCount = await myDataSource.query(
      `
    SELECT wc.id, wc.category_name, wc.eng_category_name, count(*) category_cnt 
    FROM Works_Category wc 
    LEFT JOIN Works_Posting wp 
    ON wc.id = wp.category_id 
    GROUP BY wc.id
    `
    );
    console.log('dao categoryAllCount =', categoryAllCount);
    return categoryAllCount;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 카테고리별 리스트
const selectCategoryList = async category_id => {
  try {
    let result = await myDataSource.query(
      `
      SELECT 
        wc.id, wc.category_name, wc.eng_category_name, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "postingId", wp.id, 
            "postUserId", wp.user_id, 
            "postTitle", wp.title 
          )
        ) as feeds
        from Works_Category wc 
        join Works_Posting wp on wc.id = wp.category_id 
        where wc.id = 1
        group by wc.id
      `
    ); // where wc.id = 1을 키값으로 바꿔야 함!!

    result = [...result].map(item => {
      return { ...item, feeds: JSON.parse(item.feeds) };
    });

    console.log('dao selectCategoryList =', result);
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// tag별 피드 개수
const tagCount = async () => {
  try {
    const result = await myDataSource.query(
      `
      SELECT wtn.id, wtn.name, count(DISTINCT(wpt.id)) tag_cnt 
      from Works_Posting_tags wpt 
      join Works_tag_names wtn 
      on wpt.tag_id = wtn.id 
      GROUP BY wtn.id 
      `
    );
    console.log('dao tagcount =', result);
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { categoryCount, tagCount, selectCategoryList };
