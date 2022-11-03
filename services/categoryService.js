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

module.exports = { categoryCount };
