const workDao = require('../models/workDao');

const uploadImages = async (image) => {
  const path = image.map(img => img.location);
  if (image === undefined) {
    return res.status(400).send(util.fail(400, "이미지가 존재하지 않습니다"))
  }
  await workDao.uploadImages(path)
}

module.exports = { uploadImages }