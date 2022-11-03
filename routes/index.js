const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const postRouter = require('./workRouter');
const categoryRouter = require('./categoryRouter');
const feedRouter = require('./feedRouter');
// const otherRouter = require('./other');

router.use('/user', userRouter);
// router.use(otherRouter);

router.use('/works', postRouter);
router.use('/feeds', feedRouter);
router.use('/category', categoryRouter);

module.exports = router;
