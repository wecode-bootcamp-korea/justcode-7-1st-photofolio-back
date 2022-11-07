const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const postRouter = require('./workRouter');
const categoryRouter = require('./categoryRouter');
const feedRouter = require('./feedRouter');
const workRouter = require('./workRouter');

router.use('/user', userRouter);
<<<<<<< HEAD
router.use('/works', workRouter);
router.use('/feeds', feedRouter);
router.use('/category', categoryRouter);

=======
>>>>>>> 4c6ddd3 (merge하기 전 기록용commit)
module.exports = router;
