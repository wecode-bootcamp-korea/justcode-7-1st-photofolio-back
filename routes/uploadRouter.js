const express = require('express');
const router = express.Router();
<<<<<<< HEAD
// const upload = require('../middlewares/multer')

const { validateToken } = require('../middlewares/validateToken');
// const uploadController = require('../controllers/uploadController');
=======

const upload = require('../middlewares/multer');

const { validateToken } = require('../middlewares/validateToken');

const uploadController = require('../controllers/uploadController');
>>>>>>> develop

//여러장 사진 업로드
router.post(
  '/form',
  validateToken,
  upload.array('file', 4),
  uploadController.uploadImages
);

module.exports = router;
