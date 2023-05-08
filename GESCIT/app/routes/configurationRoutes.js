const express = require('express');
const router = express.Router();

const env = process.env.env || 'LOCAL';
const config = require('../../config/env')[env];

router.get('/Permisos', (req, res) => {
    const data = {
        Page: 'Configuration/Permissions',
        Categoría: 'Configuracion',
        Modulo: 'Permisos',
        JSFile: config.BasePath + '/js/Configuration/Permissions.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
        ServiceFile: '',
    };
    res.render('views', data);
});

router.get('/login', (req, res) => {
    const data = {
        JSFile: config.BasePath + '/js/Configuration/login.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
        ServiceFile: '',
    };
    res.render('login', data);
});

module.exports = router;