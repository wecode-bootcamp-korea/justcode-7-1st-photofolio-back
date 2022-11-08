const workService = require('../services/workService');

// 카테고리별 총 게시물 수 + 최신 feed list
const worksList = async (req, res) => {
  try {
    const result = await workService.worksList();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 지정된 피드 상세
const feed = async (req, res) => {
  console.log('들어왔나');
  try {
    const { id } = req.params;
    user_id = req.user_id;
    const result = await workService.feed(id, user_id);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 팔로우 체결
const following = async (req, res) => {
  try {
    const { following_id } = req.body;
    user_id = req.user_id;
    const result = await workService.following(following_id, user_id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

//팔로우 취소
const followingCancel = async (req, res) => {
  try {
    const { following_id } = req.body;
    user_id = req.user_id;
    const result = await workService.followingCancel(following_id, user_id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const getComment = async (req, res) => {
  try {
    //게시물id가 없을 경우 에러 발생
    const { posting_id } = req.body;
    if (!posting_id) {
      const error = new Error('VALID POSTING_ID NEEDED');
      error.statusCode = 404;
      throw error;
    }
    const commentDisplayed = await userService.getComment(posting_id);
    res.status(200).json({
      data: commentDisplayed,
    }),
      console.log(`COMMENT DISPLAYED`);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).json({ message: error.message });
  }
};

const postComment = async (req, res) => {
  try {
    user_id = req.user_id;
    const { id } = req.params;
    const { comment } = req.body;

    //댓글 내용이 없을 경우 에러 발생
    if (!comment) {
      const error = new Error('COMMENT TEXT NEEDED');
      error.statusCode = 404;
      throw error;
    }
    // 게시물id가 없을 경우 에러 발생
    if (!id) {
      const error = new Error('VALID POSTING_ID NEEDED');
      error.statusCode = 404;
      throw error;
    }
    const postedComment = await workService.postComment(comment, id, user_id);
    res.status(200).json({
      data: postedComment,
    });
    console.log(`COMMENT POSTED`);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).json({ message: error.message });
  }
};

const modifiyComment = async (req, res) => {
  try {
    user_id = req.user_id;
    const { id } = req.params;
    const { comment_id } = req.headers;
    const { comment } = req.body;
    const modifiedComment = await workService.modifiyComment(
      id,
      comment,
      user_id,
      comment_id
    );
    res.status(200).json({
      data: modifiedComment,
    });
    console.log(`COMMENT MODIFIED`);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    user_id = req.user_id;
    const { comment_id } = req.headers;
    await workService.deleteComment(user_id, comment_id);
    res.status(200).json({ message: 'COMMENT DELETED' });
    console.log('COMMENT DELETED');
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = {
  worksList,
  feed,
  following,
  followingCancel,
  getComment,
  postComment,
  modifiyComment,
  deleteComment,
};
