const express = require('express');
const router = express.Router();

const env = process.env.env || 'LOCAL';
const config = require('../../config/env')[env];

router.get('/CitasPorHorario', (req, res) => {
    const data = {
        Page: 'tools/DatesXSchedules',
        Categoría: 'Herramientas',
        Modulo: 'Numero de Citas por Horario',
        JSFile: '/js/tools/DatesXSchedules.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
    };
    res.render('views', data);
});

module.exports = router;