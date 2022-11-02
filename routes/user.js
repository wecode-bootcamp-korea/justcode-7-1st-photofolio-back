const express = require('express');

const {
  signupController,
  loginController,
  layerConnectionTest,
} = require('../controllers/user');

const router = express.Router();

router.post('/ping', layerConnectionTest);
router.post('/signup', signupController);
router.post('/login', loginController);

module.exports = router;
