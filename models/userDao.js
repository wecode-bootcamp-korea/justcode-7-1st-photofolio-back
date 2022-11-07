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
  // console.log('Data Source has been initialized!');
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
  console.log('I am in userdao1');
  const [userdata] = await myDataSource.query(`
  SELECT * FROM USERS WHERE ID = '${user_id}';
  `);
  console.log('I am in userdao2');
  return userdata;
};

const modifyAccountInfo = async (
  user_id,
  kor_name,
  eng_name,
  email,
  nickname
) => {
  await myDataSource.query(
    `UPDATE USERS SET kor_name='${kor_name}', eng_name='${eng_name}', email='${email}', nickname='${nickname}' WHERE id='${user_id}';`
  );
  const [userdata] = await myDataSource.query(`
  SELECT * FROM USERS WHERE ID = '${user_id}';
  `);
  return userdata;
};

const deleteAccount = async user_id => {
  await myDataSource.query(
    `DELETE FROM USERS WHERE id='${user_id}'`
    // `UPDATE Users SET delete_at=DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE id='${user_id}'`
  );
};

const getComment = async posting_id => {
  const commentDisplayed = await myDataSource.query(
    `SELECT comment.id as comment_id, user_id, posting_id, comment, DATE_FORMAT(comment.created_at, '%Y-%m-%d') as created_at, DATE_FORMAT(comment.updated_at,'%Y-%m-%d') as updated_at, nickname FROM COMMENT 
    LEFT JOIN USERS ON users.id = comment.user_id where posting_id = ${posting_id};`
  );
  return commentDisplayed;
};

const postComment = async (comment, posting_id, user_id) => {
  await myDataSource.query(
    `INSERT COMMENT SET comment='${comment}', posting_id=${posting_id}, user_id=${user_id};`
  );
  const postedComment = await myDataSource.query(
    `SELECT * FROM COMMENT WHERE comment.id = (SELECT MAX(id) FROM COMMENT);`
  );
  return postedComment;
};

const modifiyComment = async (posting_id, comment, user_id, comment_id) => {
  const [selectedComment] = await myDataSource.query(
    `SELECT * FROM comment where id=${comment_id}`
  );
  //댓글이 존재하지 않을 경우 에러 발생
  if (!selectedComment) {
    const error = new Error('COMMENT DOES NOT EXIST');
    error.statusCode = 404;
    throw error;
  }
  //로그인한 사용자와 댓글 작성자가 다를 경우 에러 발생
  if (selectedComment.user_id !== user_id) {
    const error = new Error('ONLY WRITER CAN DELETE COMMENT');
    error.statusCode = 404;
    throw error;
  }
  await myDataSource.query(
    `UPDATE COMMENT SET comment='${comment}', user_id=${user_id}, posting_id=${posting_id} WHERE id=${comment_id};`
  );
  const modifedComment = await myDataSource.query(
    `SELECT * FROM COMMENT WHERE id=${comment_id};`
  );
  return modifedComment;
};

const deleteComment = async (user_id, comment_id) => {
  const [selectedComment] = await myDataSource.query(
    `SELECT * FROM comment where id=${comment_id}`
  );
  //댓글이 존재하지 않을 경우 에러 발생
  if (!selectedComment) {
    const error = new Error('COMMENT DOES NOT EXIST');
    error.statusCode = 404;
    throw error;
  }
  //로그인한 사용자와 댓글 작성자가 다를 경우 에러 발생
  if (selectedComment.user_id !== user_id) {
    const error = new Error('ONLY WRITER CAN DELETE COMMENT');
    error.statusCode = 404;
    throw error;
  }
  await myDataSource.query(`DELETE FROM comment where id=${comment_id}`);
};

// const layerConnectionTest = async () => {
//   console.log('I am in userDao');
// };

module.exports = {
  getUserByEmail,
  createUserInDb,
  findDbUser,
  getAccountInfo,
  deleteAccount,
  modifyAccountInfo,
  getComment,
  postComment,
  modifiyComment,
  deleteComment,
};
