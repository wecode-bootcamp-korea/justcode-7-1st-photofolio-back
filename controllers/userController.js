const { json } = require('express');
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
    } = req.body;
    const profile_image = req.file.location;

    const REQUIRE_KEYS = [
      login_id,
      password,
      password_check,
      kor_name,
      eng_name,
      email,
    ];

    Object.keys(REQUIRE_KEYS).map(key => {
      if (!REQUIRE_KEYS[key]) {
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
      profile: 'profile',
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
      const error = new Error('NO USER_ID IN REQ');
      error.statusCode = 404;
      throw error;
    }
    const userdata = await userService.getAccountInfo(user_id);
    res.status(200).json({ data: userdata });
    console.log(`USER_ID ${user_id}'s INFORMATION IS BEING DISPLAYED`);
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
      const error = new Error('NO USER_ID IN REQ');
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
      .json({ message: 'USER INFORMATION HAS BEEN MODIFIED', data: userdata });
    console.log(`USER_ID ${user_id}'s INFORMATION HAS BEEN MODIFIED`);
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

module.exports = {
  createUser,
  loginUser,
  getAccountInfo,
  modifyAccountInfo,
  deleteAccount,
};
