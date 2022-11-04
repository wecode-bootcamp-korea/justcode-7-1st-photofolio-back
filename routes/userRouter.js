const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')

const { validateToken } = require('../middlewares/validateToken');
const userController = require('../controllers/userController');

//회원가입
router.post('/signup', upload.single('profile_image'), userController.createUser);
//로그인
router.post('/login', userController.loginUser);
//계정정보조회페이지
router.post('/accountInfo', validateToken, userController.getAccountInfo);

// router.get('/test', userController.layerConnectionTest);

// 회원가입시 데이터 넣는 함수(위의 회원가입에서도 연동 확인되면 삭제 예정)
router.post('/profile', upload.single('profile_image'), userController.uploadProfile);


module.exports = router;
