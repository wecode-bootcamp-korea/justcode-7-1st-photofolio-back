const workDao = require('../models/workDao');

// 카테고리별 총 게시물 수 + 최신 feed list
const worksList = async () => {
  try {
    const result = await workDao.worksList();
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 지정된 피드 상세
const feed = async (id, user_id) => {
  try {
    const result = await workDao.feed(id, user_id);
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 팔로우 체결
const following = async (following_id, user_id) => {
  try {
    const result = await workDao.following(following_id, user_id);
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 팔로우 체결
const followingCancel = async (following_id, user_id) => {
  try {
    const result = await workDao.followingCancel(following_id, user_id);
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  worksList,
  feed,
  following,
  followingCancel,
};
