const categoryService = require('../services/categoryService');

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

// 카테고리별 피드 리스트 /fashion
const categoryList1 = async (req, res) => {
  try {
    const result = await categoryService.categoryList1();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 카테고리별 피드 리스트 /pattern
const categoryList2 = async (req, res) => {
  try {
    const result = await categoryService.categoryList2();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 카테고리별 피드 리스트 /travel
const categoryList3 = async (req, res) => {
  try {
    const result = await categoryService.categoryList3();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 카테고리별 피드 리스트 /animal
const categoryList4 = async (req, res) => {
  try {
    const result = await categoryService.categoryList4();
    res.status(200).json(result);
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
