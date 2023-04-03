const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger/swagger');
require('dotenv').config();

const configurationRoutes = require('./routes/configurationRoutes');
const datesRoutes = require('./routes/datesRoutes');
const catalogsRoutes = require('./routes/catalogsRoutes');
const documentsRoutes = require('./routes/documentsRoutes');
const toolsRoutes = require('./routes/toolsRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

const urlApi = process.env.urlApi;

app.use(`${urlApi}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(`${urlApi}/configuration`, configurationRoutes);

app.use(`${urlApi}/catalogs`, catalogsRoutes);

app.use(`${urlApi}/dates`, datesRoutes);

app.use(`${urlApi}/documents`, documentsRoutes);

app.use(`${urlApi}/tools`, toolsRoutes);

app.get(`/`, (req, res) => {
  res.redirect(`${urlApi}/api-docs`);
});

module.exports = app;
