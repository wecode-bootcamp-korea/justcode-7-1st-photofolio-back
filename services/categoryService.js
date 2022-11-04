const categoryDao = require('../models/categoryDao');

// 카테고리별 총 게시물 수
const categoryCount = async () => {
  try {
    const result = await categoryDao.categoryCount();
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// tag별 피드 개수
const tagCount = async () => {
  try {
    const result = await categoryDao.tagCount();
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 카테고리별 피드 리스트
const selectCategoryList = async () => {
  try {
    const result = await categoryDao.selectCategoryList();
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { categoryCount, tagCount, selectCategoryList };
