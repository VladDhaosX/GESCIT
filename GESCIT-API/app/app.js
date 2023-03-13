const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger/swagger');

const configurationRoutes = require('./routes/configurationRoutes');
const datesRoutes = require('./routes/datesRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/GesCitApi/configuration', configurationRoutes);

app.use('/GesCitApi/dates', datesRoutes);

// Agregar la documentación de Swagger
app.use('/GesCitApi/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicia el servidor
app.get('/GesCitApi/', (req, res) => {
    res.redirect('/GesCitApi/api-docs');
  });

module.exports = app;
