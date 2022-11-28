const express = require('express');
const router = express.Router();

// 토큰이 필요할시,
const commentController = require('../controllers/commentController');

router.post('/', commentController.postComment);
router.patch('/', commentController.modifiyComment);
router.delete('/', commentController.deleteComment);

// feed/23/comment

module.exports = router;
