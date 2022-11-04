const { json } = require('express');
const { util } = require('../middlewares/util');

//게시글 사진 업로드
const uploadImages = async(req, res) => {
  const image = req.files;
  const path = image.map(img => img.location);
  if(image === undefined) {
    return res.status(400).send(util.fail(400, "이미지가 존재하지 않습니다"))
      }
      res.status(200).send(util.success(200, "요청성공", path));
}

module.exports = { uploadImages };