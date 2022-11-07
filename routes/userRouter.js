const express = require('express');
const router = express.Router();

const { validateToken } = require('../middlewares/validateToken');
const userController = require('../controllers/userController');

//회원가입
router.post('/signup', userController.createUser);
//로그인
router.post('/login', userController.loginUser);
//계정정보조회페이지
router.post('/accountInfo', validateToken, userController.getAccountInfo);
//계정정보수정
router.patch('/accountInfo', validateToken, userController.modifyAccountInfo);

//계정삭제
router.delete('/accountInfo', validateToken, userController.deleteAccount);

//댓글조회
router.get('/comment', userController.getComment);
//댓글작성
router.post('/comment', validateToken, userController.postComment);
//댓글수정
router.patch('/comment', validateToken, userController.modifiyComment);
//댓글삭제
router.delete('/comment', validateToken, userController.deleteComment);

// router.get('/test', userController.layerConnectionTest);

module.exports = router;
