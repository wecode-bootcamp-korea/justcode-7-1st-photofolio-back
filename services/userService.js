const userDao = require('../models/userDao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (
  login_id, password, password_check, kor_name, eng_name, country, email, profile_image
  ) => {

  if (!email.includes('@') || !email.includes('.')) { 
    throw new Error('EMAIL_INVALID');
  }

  if (password.length < 10) {
    throw new Error('PASSWORD_TOO_SHORT');
  }

  if (password !== password_check) {
    throw new Error('PASSWORD_DONT_SAME');
  }

  const user = await userDao.getUserByEmail(email);

  if (user.length !== 0) {
    throw new Error("USER_ALREADY_EXISTS");
  }

  const createdUser = await userDao.createUserInDb(
    login_id, password, kor_name, eng_name, country, email, profile_image
    );

  return createdUser
}

const loginUser = async (login_id, password) => {
  const dbUser = await userDao.findDbUser(login_id)
  if (!dbUser) {
    const error = new Error('USER_DOES_NOT_EXIST')
    error.statusCode = 404
    throw error
  }
  const pwSame = bcrypt.compareSync(password, dbUser.password)
  if (!pwSame) {
    const error = new Error('INVALID_PASSWORD')
    error.statusCode = 400
    throw error
  }
    //받은 요청의 id와 password로 DB에서 프로필사진, 닉네임 등 로그인 정보를 가져온다.
  const name = dbUser.kor_name;
  const profile = dbUser.profile_image;
  const id = dbUser.id;
  const userEmail = dbUser.email;
  token = jwt.sign({
    type: 'JWT',
    name: name,
    profile: profile,
    id: id,
    email:userEmail
  }, process.env.SECRET_KEY, {
    expiresIn: '30m', // 만료시간 30분
    issuer: '토큰발급자',
  });
}

module.exports = { createUser, loginUser };
