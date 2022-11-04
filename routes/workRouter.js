const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')

const workController = require('../controllers/workController');

//여러장 사진 업로드
router.post('/selfies', upload.array('file', 4), workController.uploadImages);

module.exports = router;