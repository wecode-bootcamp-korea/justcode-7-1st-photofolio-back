const express = require('express');
const router = express.Router();

// 토큰이 필요할시,
const { validateToken } = require('../middlewares/validateToken');

// router.get('/comment', workController.getComment);
router.post('/comment', validateToken, workController.postComment);
router.patch('/comment', validateToken, workController.modifiyComment);
router.delete('/comment', validateToken, workController.deleteComment);

module.exports = router;
