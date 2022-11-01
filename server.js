require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config();
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);

const routes = require('./routes');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use(morgan('combined'));

const server = http.createServer(app);
const PORT = process.env.PORT || 10010;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
