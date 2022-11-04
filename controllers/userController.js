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
      profile: 'profile'
    });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const getAccountInfo = async (req, res) => {
  console.log('띠용');
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

// const layerConnectionTest = async () => {
//   console.log('I am in userController1');
//   await userService.layerConnectionTest();
//   console.log('I am in userController2');
// };

module.exports = { createUser, loginUser, getAccountInfo };
