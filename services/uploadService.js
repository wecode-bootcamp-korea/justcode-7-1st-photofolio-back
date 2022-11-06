const uploadDao = require('../models/uploadDao');


const uploadImages = async (title, content, tag, image, category_name, user_id, public_status) => {
  console.log('서비스1')
  const path = image.map(img => img.location);
  if (image === undefined) {
    throw new Error("이미지가 존재하지 않습니다")
  }
};

// 지정된 피드 상세
const feed = async () => {
  try {
    const result = await workDao.feed();
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

  if (tag.length > 10) {
    throw new Error("태그는 10개까지만 할 수 있어요.")
  }
  const category_id = await uploadDao.worksCategory(category_name);
  console.log('서비스2')
  const status_id = await uploadDao.publicStatus(public_status);
  console.log('서비스3')
  const tilteName = await uploadDao.findTilte(title, user_id);
  console.log('서비스4')
  console.log(tilteName)
  if (tilteName.length !==0 ) {
    throw new Error('같은 제목이 이미 존재합니다.');
  }
  await uploadDao.uploadForm(title, content, user_id, category_id, status_id);
  console.log('서비스5')
  const posting_id = await uploadDao.worksPosting(user_id, title);
  console.log('서비스6')
  await uploadDao.uploadImages(posting_id, path);
  console.log('서비스7')


const uploadTest = async (image) => {
  const path1 = image.map(img => img.location);
  if (image === undefined) {
    return res.status(400).send(util.fail(400, "이미지가 존재하지 않습니다"))
  }
  await uploadDao.uploadImages(path1)
}



module.exports = { uploadImages, uploadTest }
