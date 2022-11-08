const feedDao = require('../models/feedDao');

// 최신 feed list
const feedsList = async () => {
  try {
    const result = await feedDao.feedsList();
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};
module.exports = { feedsList };