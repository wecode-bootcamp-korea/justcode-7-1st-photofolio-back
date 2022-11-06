const { json } = require('express');
const { util } = require('../middlewares/util');
const uploadService = require('../services/uploadService');
const jwt = require('jsonwebtoken');

// 카테고리별 총 게시물 수 + 최신 feed list
const worksList = async (req, res) => {
  try {
    console.log('컨트롤러1')
    const image = req.files;
    const path = image.map(img => img.location);
    const { title, content, tag, category_name, public_status } = req.body
    const verifiedToken = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    const user_id = verifiedToken.id;
    req.user_id = user_id;

    await uploadService.uploadImages(
      title, content, tag, image, category_name, user_id, public_status
      );
    console.log('컨트롤러2')
    res.status(200).send(util.success(200, "업로드 성공",path));
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 지정된 피드 상세
const feed = async (req, res) => {
  try {
    const image = req.files;
    const path1 = image.map(img => img.location);
    await uploadService.uploadImages(path1);
    res.status(200).send(util.success(200, "업로드 성공",path1));
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { worksList, feed };

module.exports = { uploadImages, uploadTest };