const express = require('express');
const app = express();
const router = require('./routes/routes');

const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

require('dotenv').config();
const urlApi = process.env.urlApi;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use(urlApi,router);

module.exports = app;
