const { DataSource } = require('typeorm');
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});
myDataSource.initialize()

const worksCategory = async category_name => {
  const category_id = await myDataSource.query(`
    SELECT id FROM Works_category WHERE category_name = '${category_name}'
  `);
  return category_id;
};

const publicStatus = async statusName => {
  const status_id = await myDataSource.query(`
    SELECT id FROM public_status WHERE status = '${statusName}'
  `);
  return status_id;
};

const uploadForm = async (title, content, user_id, category_id, status_id) => {
  const posting = await myDataSource.query(`
  INSERT INTO Works_Posting (user_id, category_id, title, content, status_id)
  VALUES ('${user_id}', '${category_id}', '${title}', '${content}', '${status_id}')
  `)
  return posting
}

const worksPosting = async (user_id, title) => {
  const posting_id = await myDataSource.query(`
    SELECT id FROM Works_Posting WHERE user_id = '${user_id}' AND title='${title}'
  `)
  return posting_id
}

const uploadImages = async (posting_id, path) => {
  for (let i = 0; i < path.length; i++) {
    await myDataSource.query(`
  INSERT INTO upload_file (posting_id, file_sort_id, upload_url)
  VALUES ('${posting_id}', '1', '${path[i]}')
  `)
  }
}

const uploadTest = async (path1) => {
  for (let i = 0; i < path1.length; i++) {
    await myDataSource.query(`
  INSERT INTO upload_file (posting_id, file_sort_id, upload_url)
  VALUES ('1', '1', '${path1[i]}')
  `)
  }
}


module.exports = { worksCategory, publicStatus, uploadForm, worksPosting, uploadImages, uploadTest }