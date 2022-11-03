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

module.exports = { categoryCount };
