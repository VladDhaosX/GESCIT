const express = require('express');
const router = express.Router();

const env = process.env.env || 'LOCAL';
const config = require('../../config/env')[env];

router.get('/Transportes', (req, res) => {
    const data = {
        Page: 'Catalogs/Transports',
        Categoría: 'Catálogos',
        Modulo: 'Transportes',
        JSFile: config.BasePath + '/js/Catalogs/Transports.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
        ServiceFile: config.BasePath + '/js/Services/Catalogs/TransportsServices.js',

    };
    res.render('views', data);
});

router.get('/LineasDeTransporte', (req, res) => {
    const data = {
        Page: 'Catalogs/TransportLines',
        Categoría: 'Catálogos',
        Modulo: 'Líneas de Transporte',
        JSFile: config.BasePath + '/js/Catalogs/TransportLines.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
        ServiceFile: config.BasePath + '/js/Services/Catalogs/TransportLinesServices.js',

    };
    res.render('views', data);
});

router.get('/Choferes', (req, res) => {
    const data = {
        Page: 'Catalogs/Drivers',
        Categoría: 'Catálogos',
        Modulo: 'Choferes',
        JSFile: config.BasePath + '/js/Catalogs/Drivers.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
        ServiceFile: config.BasePath + '/js/Services/Catalogs/DriversServices.js',

    };
    res.render('views', data);
});

router.get('/Documentos', (req, res) => {
    const data = {
        Page: 'Catalogs/Documents',
        Categoría: 'Catálogos',
        Modulo: 'Documentos',
        JSFile: config.BasePath + '/js/Catalogs/Documents.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
        ServiceFile: '',
    };
    res.render('views', data);
});

router.get('/Roles', (req, res) => {
    const data = {
        Page: 'Catalogs/Roles',
        Categoría: 'Catálogos',
        Modulo: 'Roles',
        JSFile: config.BasePath + '/js/Catalogs/Roles.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
        ServiceFile: config.BasePath + '/js/Services/Catalogs/RolesServices.js',
    };
    res.render('views', data);
});

module.exports = router;