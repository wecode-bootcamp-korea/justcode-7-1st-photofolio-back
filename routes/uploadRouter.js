const express = require('express');
const router = express.Router();

// merge이후 오류로 인한 우선 주석처리
// const upload = require('../middlewares/multer');

const { validateToken } = require('../middlewares/validateToken');

// merge이후 오류로 인한 우선 주석처리
// const uploadController = require('../controllers/uploadController');

//여러장 사진 업로드
router.post(
  '/form',
  validateToken,
  upload.array('file', 4),
  uploadController.uploadImages
);

module.exports = router;
