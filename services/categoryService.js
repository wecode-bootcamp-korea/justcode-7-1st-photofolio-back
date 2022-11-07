const categoryDao = require('../models/categoryDao');

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

// 카테고리별 피드 리스트 /fashion
const categoryList1 = async () => {
  try {
    const result = await categoryDao.categoryList1();
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 카테고리별 피드 리스트 /pattern
const categoryList2 = async () => {
  try {
    const result = await categoryDao.categoryList2();
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 카테고리별 피드 리스트 /travel
const categoryList3 = async () => {
  try {
    const result = await categoryDao.categoryList3();
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 카테고리별 피드 리스트 /animal
const categoryList4 = async () => {
  try {
    const result = await categoryDao.categoryList4();
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  tagCount,
  categoryList1,
  categoryList2,
  categoryList3,
  categoryList4,
};