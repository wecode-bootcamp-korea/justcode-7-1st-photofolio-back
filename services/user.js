const models = require('../models/user');

function signup() {}
function login() {}

const layerConnectionTest = async () => {
  console.log('I am in user service 1');
  await models.layerConnectionTest();
  console.log('I am in user service 2');
};

module.exports = { signup, login, layerConnectionTest };
