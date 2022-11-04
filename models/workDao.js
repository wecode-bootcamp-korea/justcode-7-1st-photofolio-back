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

const uploadImages = async (path) => {
  for (let i = 0; i < path.length; i++) {
  await myDataSource.query(`
  INSERT INTO upload_file (upload_url)
  VALUES ('${path[i]}')
  `)  
  } 
}

module.exports = { uploadImages }