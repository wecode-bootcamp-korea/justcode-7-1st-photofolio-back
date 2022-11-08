const { DataSource, SimpleConsoleLogger } = require('typeorm');
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

const getComment = async posting_id => {
  const commentDisplayed = await myDataSource.query(
    `SELECT comment.id as comment_id, user_id, posting_id, comment, DATE_FORMAT(comment.created_at, '%Y-%m-%d') as created_at, DATE_FORMAT(comment.updated_at,'%Y-%m-%d') as updated_at, nickname FROM COMMENT 
    LEFT JOIN USERS ON users.id = comment.user_id where posting_id = ${posting_id};`
  );
  return commentDisplayed;
};

const postComment = async (comment, id, user_id) => {
  await myDataSource.query(
    `INSERT COMMENT SET comment='${comment}', posting_id=${id}, user_id=${user_id};`
  );
  const postedComment = await myDataSource.query(
    `SELECT * FROM COMMENT WHERE comment.id = (SELECT MAX(id) FROM COMMENT);`
  );
  return postedComment;
};

const modifiyComment = async (id, comment, user_id, comment_id) => {
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
    const error = new Error('ONLY WRITER CAN MODIFY COMMENT');
    error.statusCode = 404;
    throw error;
  }
  await myDataSource.query(
    `UPDATE COMMENT SET comment='${comment}', user_id=${user_id}, posting_id=${id} WHERE id=${comment_id};`
  );
  const modifedComment = await myDataSource.query(
    `SELECT * FROM COMMENT WHERE id=${comment_id};`
  );
  return modifedComment;
};

const deleteComment = async (user_id, comment_id) => {
  console.log(user_id);
  console.log(comment_id);
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

module.exports = {
  getComment,
  postComment,
  modifiyComment,
  deleteComment,
};
