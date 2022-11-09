const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const postRouter = require('./workRouter');
const categoryRouter = require('./categoryRouter');
const feedRouter = require('./feedRouter');
const workRouter = require('./workRouter');
<<<<<<< HEAD
const commentRouter = require('./commentRouter');
// const uploadRouter = require('./uploadRouter');
=======
const searchListRouter = require('./searchListRouter');

const uploadRouter = require('./uploadRouter');
>>>>>>> develop

router.use('/user', userRouter);
router.use('/works', workRouter);
router.use('/feeds', feedRouter);
router.use('/category', categoryRouter);
<<<<<<< HEAD
// router.use('/upload', uploadRouter);
router.use('/comments', commentRouter);
=======
router.use('/searchlist', searchListRouter);
router.use('/upload', uploadRouter);
>>>>>>> develop
module.exports = router;
