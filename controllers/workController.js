const { json } = require('express');
const { util } = require('../middlewares/util');
const workService = require('../services/workService');

//게시글 사진 업로드
const uploadImages = async (req, res) => {
  try {
    const image = req.files;
    const path = image.map(img => img.location);
    await workService.uploadImages(image);
    res.status(200).send(util.success(200, "요청성공",path));
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}

module.exports = { uploadImages };