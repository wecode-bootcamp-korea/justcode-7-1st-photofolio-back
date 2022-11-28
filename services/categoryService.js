const categoryDao = require('../models/categoryDao');

// tag별 피드 개수
const tagCount = async () => {
  try {
    //TODO 10 - function name in DAO describe CRUD behavior with data.
    // create, get(find), update, delete
    const result = await categoryDao.getNumberOfTag();
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 카테고리별 피드 리스트
const categoryList = async categoryName => {
  try {
    const result = await categoryDao.getCategoryList(categoryName);
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  tagCount,
  categoryList,
};