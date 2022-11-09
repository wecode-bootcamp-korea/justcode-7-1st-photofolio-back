const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const postRouter = require('./workRouter');
const categoryRouter = require('./categoryRouter');
const feedRouter = require('./feedRouter');
const workRouter = require('./workRouter');
const commentRouter = require('./commentRouter');
// const uploadRouter = require('./uploadRouter');
const searchListRouter = require('./searchListRouter');

const uploadRouter = require('./uploadRouter');

router.use('/user', userRouter);
router.use('/works', workRouter);
router.use('/feeds', feedRouter);
router.use('/category', categoryRouter);
// router.use('/upload', uploadRouter);
router.use('/comments', commentRouter);
router.use('/searchlist', searchListRouter);
router.use('/upload', uploadRouter);
module.exports = router;
