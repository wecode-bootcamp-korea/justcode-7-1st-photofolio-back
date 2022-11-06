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

const worksCategory = async (category_name) => {
  console.log('다오1')
  const [categoryId] = await myDataSource.query(`
    SELECT id FROM Works_category WHERE category_name = '${category_name}'
  `);
  const category_id = categoryId.id
  return category_id;
};

const publicStatus = async (public_status) => {
  console.log('다오2')
  const [statusId] = await myDataSource.query(`
    SELECT id FROM public_status WHERE status = '${public_status}'
  `);
  const status_id = statusId.id
  return status_id;
};

const findTilte = async (title, user_id) => {
  console.log('다오3')
  const tilteName = await myDataSource.query(`
  SELECT title FROM Works_Posting WHERE title = '${title}' and user_id = '${user_id}'
`);
  return tilteName
}


const uploadForm = async (title, content, user_id, category_id, status_id) => {
  console.log('다오4')
  const posting = await myDataSource.query(`
  INSERT INTO Works_Posting (user_id, category_id, title, content, status_id)
  VALUES ('${user_id}', '${category_id}', '${title}', '${content}', '${status_id}')
  `)
  console.log(posting)
  return posting
}

const worksPosting = async (user_id, title) => {
  console.log('다오5')
  const postingId = await myDataSource.query(`
    SELECT id FROM Works_Posting WHERE user_id = '${user_id}' AND title='${title}'
  `)
  console.log(postingId)
  const posting_id = postingId[0].id
  return posting_id
}

const uploadImages = async (posting_id, path) => {
  console.log('다오6')
  for (let i = 0; i < path.length; i++) {
    await myDataSource.query(`
  INSERT INTO upload_file (posting_id, file_sort_id, upload_url)
  VALUES ('${posting_id}', '1', '${path[i]}')
  `)
  }
}





module.exports = { worksCategory, publicStatus, findTilte, uploadForm, worksPosting, uploadImages }