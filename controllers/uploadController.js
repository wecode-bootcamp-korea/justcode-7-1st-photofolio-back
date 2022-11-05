const { json } = require('express');
const { util } = require('../middlewares/util');
const uploadService = require('../services/uploadService');

//게시글 사진 업로드
const uploadImages = async (req, res) => {
  try {
    const image = req.files;
    const path = image.map(img => img.location);
    const { title, content, tag, category_name, public_status } = req.body
    const user_id = verifiedToken.id;

    await uploadService.uploadImages(
      title, content, tag, image, category_name, user_id, category_id, public_status, status_id, posting_id
      );
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