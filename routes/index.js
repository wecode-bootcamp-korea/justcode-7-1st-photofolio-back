const { application } = require('express');
const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
// const uploadRouter = require('./uploadRouter');




router.use('/user', userRouter);
// router.use('/upload', uploadRouter)

module.exports = router;
