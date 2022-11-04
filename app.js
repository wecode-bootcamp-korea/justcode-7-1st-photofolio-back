const express = require('express');
const cors = require('cors');
const multer = require('multer');;
// const upload = require({ dest : 'uploads/' })
const routes = require('./routes');
const morgan = require('morgan');


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};


const createApp = () => {
  const app = express();
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(multer);
  app.use(routes);
  app.use(morgan('combined'));

  app.use((err, req, res, next) => {
    const { status, message } = err
    console.error(err);
    res.status(status || 500).json({ message });
  })

  return app;
};



module.exports = {createApp}
