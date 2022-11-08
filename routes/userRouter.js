const express = require('express');
const router = express.Router();
// const upload = require('../middlewares/multer');

const { validateToken } = require('../middlewares/validateToken');
const userController = require('../controllers/userController');

//회원가입
// merge이후 오류로 인한 우선 주석처리
// router.post('/signup', upload.single('profile'), userController.createUser);

//로그인
router.post('/login', userController.loginUser);
//계정정보조회페이지
router.post('/accountInfo', validateToken, userController.getAccountInfo);

// router.get('/test', userController.layerConnectionTest);

module.exports = router;
