const express = require('express');
const router = express.Router();

// 토큰이 필요할시,
// const { validateToken } = require('../middlewares/validateToken');
const categoryController = require('../controllers/categoryController');

router.get('/count', categoryController.categoryCount);

module.exports = router;
