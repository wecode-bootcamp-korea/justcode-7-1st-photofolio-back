const feedDao = require('../models/feedDao');

// 지정된 피드 상세
const feed = async () => {
  try {
    const result = await feedDao.feed();
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { feed };
