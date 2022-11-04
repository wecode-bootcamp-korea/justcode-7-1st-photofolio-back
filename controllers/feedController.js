const feedService = require('../services/feedService');

// 지정된 피드 상세
const feed = async (req, res) => {
  try {
    const result = await feedService.feed();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { feed };
