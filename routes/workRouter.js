const express = require('express');
const router = express.Router();

// 토큰이 필요할시,
const { validateToken } = require('../middlewares/validateToken');
const workController = require('../controllers/workController');

// 카테고리별 총 게시물 수 + 최신 feed list
router.get('/list', workController.worksList);
router.get('/:id', workController.feed); // 토큰여부 필요함

module.exports = router;