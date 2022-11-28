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
    `INSERT Comment SET comment='${comment}', posting_id=${id}, user_id=${user_id};`
  );
  const allCommentsAfterModifying = await myDataSource.query(
    `
    SELECT c.id, c.user_id, c.posting_id, u.kor_name, c.comment, SUBSTRING(c.created_at,1,10) as created_at, SUBSTRING(c.updated_at,1,10) as updated_at 
    FROM Comment c
    LEFT JOIN Users u on u.id = c.user_id where posting_id = ${id}
    order by c.id asc;
    `
  );
  return allCommentsAfterModifying;
};


// TODO 17 - functions in dao should do one behavior at a time
const modifiyComment = async (id, comment, user_id, comment_id) => {
  const [selectedComment] = await myDataSource.query(
    `SELECT * FROM Comment where id=${comment_id}`
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
    `UPDATE Comment SET Comment='${comment}', user_id=${user_id}, posting_id=${id} WHERE id=${comment_id};`
  );
  const allCommentsAfterModifying = await myDataSource.query(
    `SELECT * FROM Comment where posting_id = ${id} 
    order by created_at asc;`
  );
  return allCommentsAfterModifying;
};

const deleteComment = async (user_id, comment_id) => {
  //TODO 18 remove console.log
  console.log(user_id);
  console.log(comment_id);
  const [selectedComment] = await myDataSource.query(
    `SELECT * FROM Comment where id=${comment_id}`
  );
  //댓글이 존재하지 않을 경우 에러 발생
  if (!selectedComment) {
    const error = new Error('COMMENT DOES NOT EXIST');
    error.statusCode = 404;
    throw error;
  }

  // errors.js 
  class DoesNotExistError extends Error {
    constructor(message) {
      super(message + ' DOES NOT EXIST');
      this.name = "DoesNotExistError";
      this.statusCode = 404;
    }
  }

  if (!selectedComment) {
    throw new DoesNotExistError('COMMENT')
  }

  // TODO - 19 CustomerErrorClass

  class WritterOnlyError extends Error {
    constructor(message) {
      super('ONLY WRITTER CAN ' + message + ' COMMENT');
      this.name = "WritterOnlyError";
      this.statusCode = 403;
    }
  }
  // TODO 20
  // 401 -> doesn't know the user (LOGIN_REQUIRED)
  // 403 -> know user, user not permitted (UNAUTHORIZED)

  //로그인한 사용자와 댓글 작성자가 다를 경우 에러 발생
  if (selectedComment.user_id !== user_id) {
    throw new WritterOnlyError('DELETE', 'COMMENT')

    const error = new Error('ONLY WRITER CAN DELETE COMMENT');
    error.statusCode = 404;
    throw error;

  }
  await myDataSource.query(`DELETE FROM Comment where id=${comment_id}`);
};

module.exports = { postComment, modifiyComment, deleteComment };
