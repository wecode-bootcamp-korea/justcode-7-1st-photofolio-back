const workService = require('../services/workService');

// 카테고리별 총 게시물 수 + 최신 feed list
const worksList = async (req, res) => {
  try {
    const result = await workService.worksList();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { worksList };
