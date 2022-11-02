const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const 
    { 
      login_id, password, password_check, kor_name, eng_name, country, email, profile_image 
    } = req.body

    const REQUIRE_KEYS = [login_id, password, password_check, kor_name, eng_name, email];

    REQUIRE_KEYS.map((key) => {
      if (!key) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    })

    const result = await userService.createUser(
      login_id, password, password_check, kor_name, eng_name, country, email, profile_image
      );

    res.status(201).json({ message: "userCreated" });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const { login_id, password } = req.body

    const REQUIRED_KEYS = { login_id, password }

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        error.statusCode = 400
        throw error
      }
    })
    const result = await userService.loginUser(login_id, password);

    res.status(200).json({
      code: 200,
      message: '토큰이 발급되었습니다.',
      token: token
    });
  } catch (err) {
    console.log(err)
    res.status(err.statusCode).json({ message: err.message })
  }
}

module.exports = { createUser, loginUser };
