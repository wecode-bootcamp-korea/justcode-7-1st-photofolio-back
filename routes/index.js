const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const postRouter = require('./workRouter');
const categoryRouter = require('./categoryRouter');
const feedRouter = require('./feedRouter');
const workRouter = require('./workRouter');

router.use('/user', userRouter);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d609540 (제발 좀)
router.use('/works', workRouter);
router.use('/feeds', feedRouter);
router.use('/category', categoryRouter);

<<<<<<< HEAD
=======
>>>>>>> 4c6ddd3 (merge하기 전 기록용commit)
=======
>>>>>>> d609540 (제발 좀)
module.exports = router;
