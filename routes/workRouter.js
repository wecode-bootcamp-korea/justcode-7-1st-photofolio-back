const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')

const { validateToken } = require('../middlewares/validateToken');
const workController = require('../controllers/workController');

//여러장 사진 업로드
router.post('/form', validateToken, upload.array('file', 4), workController.uploadImages);

router.post('/test', upload.array('file', 4), workController.uploadTest);


module.exports = router;