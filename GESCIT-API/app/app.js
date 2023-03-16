const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger/swagger');

const configurationRoutes = require('./routes/configurationRoutes');
const datesRoutes = require('./routes/datesRoutes');
const catalogsRoutes = require('./routes/catalogsRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

// Agregar la documentación de Swagger
app.use('/GesCitApi/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/GesCitApi/configuration', configurationRoutes);

app.use('/GesCitApi/catalogs', catalogsRoutes);

app.use('/GesCitApi/dates', datesRoutes);

// Inicia el servidor
app.get('/', (req, res) => {
  res.redirect('/GesCitApi/api-docs');
});

module.exports = app;
