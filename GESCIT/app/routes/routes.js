const express = require('express');
const router = express.Router()

const catalogsRoutes = require('./catalogsRoutes');
const configurationRoutes = require('./configurationRoutes');
const datesRoutes = require('./datesRoutes');
const toolsRoutes = require('./toolsRoutes');

const env = process.env.env || 'LOCAL';
const config = require('../../config/env')[env];

router.use('/Catalogos', catalogsRoutes);

router.use('/Configuracion', configurationRoutes);

router.use('/Citas', datesRoutes);

router.use('/Herramientas', toolsRoutes);

router.get('/', (req, res) => {
    res.redirect(`${config.BasePath}/Configuracion/login`);
});

module.exports = router;