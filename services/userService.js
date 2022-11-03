const userDao = require('../models/userDao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createUser = async (
  login_id, password, password_check, kor_name, eng_name, country, email, profile_image
) => {
  const num = /[0-9]/g;
  const eng = /[a-z]/ig;
  const spe = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi;
  const korAll = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const korWord = /[가-힣]/;
  const korJaMo = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
  const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  if (login_id.length < 4 || login_id.length > 12) {
    throw new Error ("아이디를 4자리 ~ 12자리 이내로 입력해주세요.");
  } 

  if (login_id.search(/\s/) != -1) {
    throw new Error ("아이디는 공백 없이 입력해주세요.");
  } 

  if (password !== password_check) {
    throw new Error("비밀번호가 서로 다릅니다.");
  }

  if (password.length < 8 || password.length > 20) {
    throw new Error ("8자리 ~ 20자리 이내로 입력해주세요.");
  } 
  
  if (password.search(/\s/) != -1) {
    throw new Error ("비밀번호는 공백 없이 입력해주세요.");
  } 
  
  if (password.search(num) < 0 || password.search(eng) < 0 || password.search(spe) < 0) {
    throw new Error ("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
  }

  if (password.search(korAll) > 0) {
    throw new Error ("한글은 안되요.");
  }

  if (kor_name.search(korWord) < 0 || kor_name.search(korJaMo) > 0) {
    throw new Error ("자음, 모음은 안되요.");
  }

  if ((kor_name).length < 2 || (kor_name).length > 6) {
    throw new Error ("한국 이름 다시 확인해주세요.");
  }

  if (kor_name.search(num) > 0 || kor_name.search(eng) > 0 || kor_name.search(spe) > 0) {
    throw new Error ("한글만 가능해요.");
  }

  if ((eng_name).length < 3 || (kor_name).length > 15) {
    throw new Error ("영문 이름 다시 확인해주세요.");
  }

  if (eng_name.search(num) > 0 || eng_name.search(korAll) > 0 || eng_name.search(spe) > 0) {
    throw new Error ("영어만 가능해요.");
  }  

  if (country.search(num) > 0 || country.search(korAll) > 0 || country.search(spe) > 0) {
    throw new Error ("한글로 써주세요.");
  } 

  if (country.search(korWord) < 0 || country.search(korJaMo) > 0) {
    throw new Error ("자음, 모음은 안되요.");
  }
  
  if (!reg_email.test(email)) {
    throw new Error("이메일 확인 부탁드립니다");
  }

  if (!email.includes('@') || !email.includes('.')) {
    throw new Error("이메일 주소가 맞나요?");
  }

const user = await userDao.getUserByEmail(email);

if (user.length !== 0) {
  throw new Error("유저가 이미 존재합니다.");
}

const createdUser = await userDao.createUserInDb(
  login_id, password, kor_name, eng_name, country, email, profile_image
);

return createdUser
}

const loginUser = async (login_id, password) => {
  const dbUser = await userDao.findDbUser(login_id)
  if (!dbUser) {
    const error = new Error("회원가입 내역이 없으시네요.")
    error.statusCode = 404
    throw error
  }
  const pwSame = bcrypt.compareSync(password, dbUser.password)
  if (!pwSame) {
    const error = new Error("비밀번호가 다릅니다.")
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
    email: userEmail
  }, process.env.SECRET_KEY, {
    expiresIn: '30m', // 만료시간 30분
    issuer: '토큰발급자',
  });
}

module.exports = { createUser, loginUser };
