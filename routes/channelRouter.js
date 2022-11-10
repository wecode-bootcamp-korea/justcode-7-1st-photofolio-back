const express = require('express');
const router = express.Router();

// 토큰이 필요할시,
const { validateToken } = require('../middlewares/validateToken');
const channelController = require('../controllers/channelController');

// 최신 feed list
router.get('/:following_id', channelController.channel);

module.exports = router;
