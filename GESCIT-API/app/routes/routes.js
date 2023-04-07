const express = require('express');
const router = express.Router()
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');

const configurationRoutes = require('./configurationRoutes');
const datesRoutes = require('./datesRoutes');
const catalogsRoutes = require('./catalogsRoutes');
const documentsRoutes = require('./documentsRoutes');
const toolsRoutes = require('./toolsRoutes');
const swaggerFile = require('../../swagger-output')

const urlApi = process.env.urlApi;

router.use(`${urlApi}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerFile));

router.use(`${urlApi}/configuration`, configurationRoutes);

router.use(`${urlApi}/catalogs`, catalogsRoutes);

router.use(`${urlApi}/dates`, datesRoutes);

router.use(`${urlApi}/documents`, documentsRoutes);

router.use(`${urlApi}/tools`, toolsRoutes);

router.get(`/`, (req, res) => {
    res.redirect(`${urlApi}/api-docs`);
});

module.exports = router;