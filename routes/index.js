const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/validateToken');

const userRouter = require('./userRouter');
//TODO 1 - remove postRouter
const postRouter = require('./workRouter');
const categoryRouter = require('./categoryRouter');
const feedRouter = require('./feedRouter');
const workRouter = require('./workRouter');
const searchListRouter = require('./searchListRouter');
const sympathyRouter = require('./sympathyRouter');
const followRouter = require('./followRouter');
const channelRouter = require('./channelRouter');
const commentRouter = require('./commentRouter');

//TODO 2 -> postingRouter로 이동.
const uploadRouter = require('./uploadRouter');

router.use('/user', userRouter);
router.use('/works', workRouter);
router.use('/feeds', feedRouter);
router.use('/category', categoryRouter);
router.use('/searchlist', searchListRouter);
router.use('/upload', uploadRouter);
router.use('/sympathy', sympathyRouter);
router.use('/follow', followRouter);
router.use('/channel', channelRouter);
router.use('/comments', validateToken, commentRouter);

module.exports = router;
