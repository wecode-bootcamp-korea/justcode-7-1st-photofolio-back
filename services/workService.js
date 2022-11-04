const workDao = require('../models/workDao');

const uploadImages = async (title, content, tag, image, user_id, category_name, public_status) => {
  const path = image.map(img => img.location);
  if (image === undefined) {
    throw new Error("이미지가 존재하지 않습니다")
  }

  if (!title) {
    throw new Error("제목을 입력해주세요")
  }

  if (tag.length > 10) {
    throw new Error("태그는 10개까지만 할 수 있어요.")
  }
  const category_id = await workDao.category_name(category_name);
  const status_id = await workDao.publicStatus(statusName);
  const posting_id = await workDao.worksPosting(user_id, title);
  await workDao.uploadImages(
    title, content, tag, image, path, user_id, category_id, public_status, status_id, posting_id
    );
}

const uploadTest = async (image) => {
  const path1 = image.map(img => img.location);
  if (image === undefined) {
    return res.status(400).send(util.fail(400, "이미지가 존재하지 않습니다"))
  }
  await workDao.uploadImages(path1)
}



module.exports = { uploadImages, uploadTest }
