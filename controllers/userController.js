const { json } = require('express');
const { SimpleConsoleLogger } = require('typeorm');
const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const {
      login_id,
      password,
      password_check,
      kor_name,
      eng_name,
      nickname,
      email,
      profile_image,
    } = req.body;

    const REQUIRE_KEYS = [
      login_id,
      password,
      password_check,
      kor_name,
      eng_name,
      email,
    ];

    REQUIRE_KEYS.map(key => {
      if (!key) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    });

    const result = await userService.createUser(
      login_id,
      password,
      password_check,
      kor_name,
      eng_name,
      nickname,
      email,
      profile_image
    );

    res.status(201).json({ message: 'userCreated' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { login_id, password } = req.body;

    const REQUIRED_KEYS = { login_id, password };

    Object.keys(REQUIRED_KEYS).map(key => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        error.statusCode = 400;
        throw error;
      }
    });
    const result = await userService.loginUser(login_id, password);

    res.status(200).json({
      code: 200,
      message: '토큰이 발급되었습니다.',
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const getAccountInfo = async (req, res) => {
  try {
    user_id = req.user_id;
    if (!user_id) {
      const error = new Error('No user_id in req');
      error.statusCode = 404;
      throw error;
    }
    const userdata = await userService.getAccountInfo(user_id);
    res.status(200).json({ data: userdata });
    console.log(`user_id ${user_id}'s information is being displayed`);
    return userdata;
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).json({ message: error.message });
  }
};

const modifyAccountInfo = async (req, res) => {
  try {
    user_id = req.user_id;
    const { kor_name, eng_name, email, nickname } = req.body;
    const essentialKeys = { kor_name, eng_name, email, nickname };
    if (!user_id) {
      const error = new Error('No user_id in req');
      error.statusCode = 404;
      throw error;
    }
    Object.keys(essentialKeys).map(key => {
      if (!essentialKeys[key]) {
        const error = new Error(`KEY_ERROR : '${key}'`);
        error.statusCode = 400;
        throw error;
      }
    });
    const userdata = await userService.modifyAccountInfo(
      user_id,
      kor_name,
      eng_name,
      email,
      nickname
    );
    res
      .status(200)
      .json({ message: 'user information has been modified', data: userdata });
    console.log(`user_id ${user_id}'s information has been modified`);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    user_id = req.user_id;
    if (!user_id) {
      const error = new Error('NO USER_ID IN REQ');
      error.statusCode = 404;
      throw error;
    }
    await userService.deleteAccount(user_id);
    res.status(200).json({
      message: `USER ${user_id}'s HAS BEEN REMOVED`,
    });
    console.log(`USER ${user_id}'s HAS BEEN REMOVED`);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).json({ message: error.message });
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
      console.log(`comment displayed`);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).json({ message: error.message });
  }
};

const postComment = async (req, res) => {
  try {
    user_id = req.user_id;
    const { comment, posting_id } = req.body;
    //댓글 내용이 없을 경우 에러 발생
    if (!comment) {
      const error = new Error('COMMENT TEXT NEEDED');
      error.statusCode = 404;
      throw error;
    }
    // 게시물id가 없을 경우 에러 발생
    if (!posting_id) {
      const error = new Error('VALID POSTING_ID NEEDED');
      error.statusCode = 404;
      throw error;
    }
    const postedComment = await userService.postComment(
      comment,
      posting_id,
      user_id
    );
    res.status(200).json({
      data: postedComment,
    });
    console.log(`comment posted`);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).json({ message: error.message });
  }
};

const modifiyComment = async (req, res) => {
  try {
    user_id = req.user_id;
    const { posting_id, comment, comment_id } = req.body;
    const modifiedComment = await userService.modifiyComment(
      posting_id,
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
    const { comment_id } = req.body;
    await userService.deleteComment(user_id, comment_id);
    res.status(200).json({ message: 'COMMENT DELETED' });
    console.log('COMMENT DELETED');
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).json({ message: error.message });
  }
};

// const layerConnectionTest = async () => {
//   console.log('I am in userController1');
//   await userService.layerConnectionTest();
//   console.log('I am in userController2');
// };

module.exports = {
  createUser,
  loginUser,
  getAccountInfo,
  deleteAccount,
  modifyAccountInfo,
  getComment,
  postComment,
  modifiyComment,
  deleteComment,
};
