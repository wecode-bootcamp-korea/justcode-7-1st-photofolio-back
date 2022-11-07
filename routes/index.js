const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const postRouter = require('./workRouter');
const categoryRouter = require('./categoryRouter');
const feedRouter = require('./feedRouter');
const workRouter = require('./workRouter');

router.use('/user', userRouter);

module.exports = router;
