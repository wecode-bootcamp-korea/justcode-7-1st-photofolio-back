const { SimpleConsoleLogger } = require('typeorm');

const services = require('../services/user');

function signupController(req, res) {
  res.status(500).json({ message: 'not implemented' }); // 구현이 되면 삭제합니다.
}

function loginController(req, res) {
  res.status(500).json({ message: 'not implemented' }); // 구현이 되면 삭제합니다.
}

const layerConnectionTest = async () => {
  console.log('I am in user controller 1');
  await services.layerConnectionTest();
  console.log('I am in user controller 2');
};

module.exports = { signupController, loginController, layerConnectionTest };
