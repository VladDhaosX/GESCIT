const express = require('express');
const router = express.Router();

const env = process.env.env || 'LOCAL';
const config = require('../../config/env')[env];

router.get('/Citas', (req, res) => {
    const data = {
        Page: 'Dates/Dates',
        Categoría: 'Gestor',
        Modulo: 'Citas',
        JSFile: '/js/Dates/Dates.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
    };
    res.render('views', data);
});

router.get('/Asignar', (req, res) => {
    const data = {
        Page: 'Dates/AssignDates',
        Categoría: 'Gestor',
        Modulo: 'Asignar Citas',
        JSFile: '/js/Dates/AssignDates.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
    };
    res.render('views', data);
});

router.get('/Seguridad', (req, res) => {
    const data = {
        Page: 'Dates/Security',
        Categoría: 'Gestor',
        Modulo: 'Seguridad',
        JSFile: '/js/Dates/Security.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
    };
    res.render('views', data);
});

module.exports = router;