const categoryService = require('../services/categoryService');

// 카테고리별 총 게시물 수
const categoryCount = async (req, res) => {
  try {
    const result = await categoryService.categoryCount();
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// tag별 피드 개수
const tagCount = async (req, res) => {
  try {
    const result = await categoryService.tagCount();
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 카테고리별 피드 리스트
const selectCategoryList = async (req, res) => {
  try {
    const result = await categoryService.selectCategoryList();
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { categoryCount, tagCount, selectCategoryList };
