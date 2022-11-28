const { DataSource } = require('typeorm');
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource.initialize();

// follow 체결 관련
const following = async (following_id, user_id) => {
  try {
    const follow = await myDataSource.query(
      `
      INSERT
        INTO
        Follow (following_id,
        follower_id)
      VALUES 
        ('${following_id}',
        '${user_id}')
    `
    );
    const followingResult = await myDataSource.query(
      `
      SELECT
        *
      FROM
        Follow f
      WHERE
        following_id = '${following_id}'
        AND follower_id = '${user_id}'
    `
    );
    let result = { followingResult };
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// follow 취소 관련
const followingCancel = async (following_id, user_id) => {
  try {
    const deleteFollow = await myDataSource.query(
      `
      DELETE
      FROM
        Follow
      WHERE
        following_id = '${following_id}'
        AND follower_id = '${user_id}'
    `
    );
    const deleteResult = await myDataSource.query(
      `
      SELECT
        count(*)
      FROM
        Follow f
      WHERE
        following_id = '${following_id}'
        AND follower_id = '${user_id}'
    `
    );
    let result = { deleteResult };
    return result;
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  following,
  followingCancel,
};
