const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { email, password, password1, name, profile_image } = req.body

    const REQUIRE_KEYS = [email, password, password1, name];

    REQUIRE_KEYS.map((key) => {
      if (!key) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    })

    const result = await userService.createUser(email, password, password1, name, profile_image);

    res.status(201).json({ message: "userCreated" });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const REQUIRED_KEYS = { email, password }

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        error.statusCode = 400
        throw error
      }
    })
    const result = await userService.loginUser(email, password);

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
