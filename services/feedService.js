const feedDao = require('../models/feedDao');

// 최신 feed list
const feedsList = async id => {
  try {
    const result = await feedDao.feedsList(id);
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};
module.exports = { feedsList };
