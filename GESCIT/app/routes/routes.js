const express = require('express');
const router = express.Router()

const catalogsRoutes = require('./catalogsRoutes');
const configurationRoutes = require('./configurationRoutes');
const datesRoutes = require('./datesRoutes');
const toolsRoutes = require('./toolsRoutes');

router.use('/Catalogos', catalogsRoutes);

router.use('/Configuracion', configurationRoutes);

router.use('/Citas', datesRoutes);

router.use('/Herramientas', toolsRoutes);

router.get('/', (req, res) => {
    res.redirect('/Configuracion/login');
});

module.exports = router;