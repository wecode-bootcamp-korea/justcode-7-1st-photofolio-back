const followService = require('../services/followService');

// 팔로우 체결
const following = async (req, res) => {
  console.log('am i following?');
  try {
    const { following_id } = req.body;
    user_id = req.user_id;
    console.log(user_id);
    console.log(following_id);
    const result = await followService.following(following_id, user_id);
    console.log('result', result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

//팔로우 취소
const followingCancel = async (req, res) => {
  console.log('am i following????');
  try {
    const { following_id } = req.body;
    user_id = req.user_id;
    console.log(user_id);
    console.log(following_id);
    const result = await followService.followingCancel(following_id, user_id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  following,
  followingCancel,
};
