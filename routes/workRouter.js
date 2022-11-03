const express = require('express');
const router = express.Router();

// 토큰이 필요할시,
// const { validateToken } = require('../middlewares/validateToken');
const postController = require('../controllers/workController');

// router.post('/signup', userController.createUser);

module.exports = router;
