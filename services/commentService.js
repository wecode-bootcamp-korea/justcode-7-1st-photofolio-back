const commentDao = require('../models/commentDao');


//TODO 16 - feedId
const postComment = async (comment, feedId, user_id) => {
  const postedComment = await commentDao.postComment(comment, feedId, user_id);
  return postedComment;
};

const modifiyComment = async (id, comment, user_id, comment_id) => {
  const selectedComment = await commentDao.getCommentById(comment_id)

  if (!selectedComment) {
    const error = new Error('COMMENT DOES NOT EXIST');
    error.statusCode = 404;
    throw error;
  }

  if (selectedComment.user_id !== user_id) {
    const error = new Error('ONLY WRITER CAN MODIFY COMMENT');
    error.statusCode = 404;
    throw error;
  }

  const modifedComment = await commentDao.modifiyComment(
    id,
    comment,
    user_id,
    comment_id
  );
  return modifedComment;
};

const deleteComment = async (user_id, comment_id) => {
  await commentDao.deleteComment(user_id, comment_id);
};

module.exports = { postComment, modifiyComment, deleteComment };
