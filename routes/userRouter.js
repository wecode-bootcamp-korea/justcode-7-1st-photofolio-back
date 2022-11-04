const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
  dset: 'uploads/'
})

const { validateToken } = require('../middlewares/validateToken');
const userController = require('../controllers/userController');

//회원가입
router.post('/signup', userController.createUser);
//로그인
router.post('/login', userController.loginUser);
//계정정보조회페이지
router.post('/accountInfo', validateToken, userController.getAccountInfo);

// router.get('/test', userController.layerConnectionTest);

router.post('/profile', upload.single('image'), userController.uploadProfile);

module.exports = router;
