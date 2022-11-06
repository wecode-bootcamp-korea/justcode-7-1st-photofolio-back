const { json } = require('express');
const { util } = require('../middlewares/util');
const uploadService = require('../services/uploadService');
const jwt = require('jsonwebtoken');

//게시글 사진 업로드
const uploadImages = async (req, res) => {
  try {
    console.log('컨트롤러1')
    const image = req.files;
    const path = image.map(img => img.location);
    const { title, content, tag, category_name, public_status } = req.body
    const arrayTag = tag.split(',')
    const verifiedToken = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    const user_id = verifiedToken.id;
    req.user_id = user_id;

    await uploadService.uploadImages(
      title, content, arrayTag, image, category_name, user_id, public_status
      );
    console.log('컨트롤러2')
    res.status(200).send(util.success(200, "업로드 성공",path));
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}

const uploadTest = async (req, res) => {
  try {
    const image = req.files;
    const path1 = image.map(img => img.location);
    await uploadService.uploadImages(path1);
    res.status(200).send(util.success(200, "업로드 성공",path1));
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}

module.exports = { uploadImages, uploadTest };