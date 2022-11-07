const express = require('express');
const router = express.Router();

// 토큰이 필요할시,
// const { validateToken } = require('../middlewares/validateToken');
const categoryController = require('../controllers/categoryController');

router.get('/tags', categoryController.tagCount); // 토큰여부 불필요
router.get('/fashion', categoryController.categoryList1); // 토큰여부 불필요
router.get('/pattern', categoryController.categoryList2); // 토큰여부 불필요
router.get('/travel', categoryController.categoryList3); // 토큰여부 불필요
router.get('/animal', categoryController.categoryList4); // 토큰여부 불필요

module.exports = router;

module.exports = router;