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

const postComment = async (comment, id, user_id) => {
  await myDataSource.query(
    `INSERT COMMENT SET comment='${comment}', posting_id=${id}, user_id=${user_id};`
  );
  const allCommentsAfterModifying = await myDataSource.query(
    `SELECT * FROM COMMENT where posting_id = ${id} 
    order by created_at desc;`
  );
  return allCommentsAfterModifying;
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
  const allCommentsAfterModifying = await myDataSource.query(
    `SELECT * FROM COMMENT where posting_id = ${id} 
    order by created_at desc;`
  );
  return allCommentsAfterModifying;
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

module.exports = { postComment, modifiyComment, deleteComment };
