const express = require('express');
const router = express.Router();

// 토큰이 필요할시,
// const { validateToken } = require('../middlewares/validateToken');
const feedController = require('../controllers/feedController');

router.get('/feedId', feedController.feed); // 토큰여부 필요함

module.exports = router;
