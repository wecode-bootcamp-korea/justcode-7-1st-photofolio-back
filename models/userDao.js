const { DataSource } = require('typeorm');
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
});
const bcrypt = require('bcryptjs');


myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  });


const getUserByEmail = async (email) => {

  const user = await myDataSource.query(`
    SELECT id, email FROM users WHERE email= '${email}'
  `);
  return user
}

const createUserInDb = async (email, name, password, profile_image) => {

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      myDataSource.query(`
    INSERT INTO users (email, name, password, profile_image)
    VALUES (
      '${email}', '${name}', '${hash}', '${profile_image}'
    )
  `);
    });
  });
};

const findDbUser = async (email) => {
  const [dbUser] = await myDataSource.query(`
  SELECT id, email, name, password, profile_image
    FROM users WHERE email = '${email}'
    `)
    return dbUser
}

module.exports = { 
  getUserByEmail, 
  createUserInDb, 
  findDbUser 
};
