const { DataSource } = require('typeorm');
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});
const bcrypt = require('bcryptjs');

myDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
});

const getUserByEmail = async email => {
  const user = await myDataSource.query(`
    SELECT id, email FROM Users WHERE email= '${email}'
  `);
  return user;
};

const createUserInDb = async (
  login_id,
  password,
  kor_name,
  eng_name,
  nickname,
  email,
  profile_image
) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      myDataSource.query(`
    INSERT INTO Users (login_id, password, kor_name, eng_name, nickname, email, profile_image)
    VALUES (
      '${login_id}', '${hash}', '${kor_name}', '${eng_name}', '${nickname}', '${email}'
      , '${profile_image}'
    )
  `);
    });
  });
};

const findDbUser = async login_id => {
  const [dbUser] = await myDataSource.query(`
  SELECT id, email, kor_name, password, profile_image
    FROM USERS WHERE login_id = '${login_id}'
    `);
  return dbUser;
};

const getAccountInfo = async user_id => {
  const [userdata] = await myDataSource.query(`
  SELECT * FROM USERS WHERE ID = '${user_id}';
  `);
  return userdata;
};
// const layerConnectionTest = async () => {
//   console.log('I am in userDao');
// };

module.exports = {
  getUserByEmail,
  createUserInDb,
  findDbUser,
  getAccountInfo,
};
