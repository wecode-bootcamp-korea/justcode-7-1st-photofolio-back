const express = require('express');
const router = express.Router();

// 토큰이 필요할시,
// const { validateToken } = require('../middlewares/validateToken');
const categoryController = require('../controllers/categoryController');

router.get('/count', categoryController.categoryCount); // 토큰여부 불필요
router.get('/tags', categoryController.tagCount); // 토큰여부 불필요
router.post('/categoryName', categoryController.selectCategoryList); // 토큰여부 불필요

module.exports = router;
