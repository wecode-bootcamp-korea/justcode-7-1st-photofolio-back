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

module.exports = { categoryCount };
