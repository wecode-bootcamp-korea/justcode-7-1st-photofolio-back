const { application } = require('express');
const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const workRouter = require('./workRouter');




router.use('/user', userRouter);
router.use('/work', workRouter);

module.exports = router;
