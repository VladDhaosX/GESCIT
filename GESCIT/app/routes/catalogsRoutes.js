const express = require('express');
const router = express.Router();

const env = process.env.env || 'LOCAL';
const config = require('../../config/env')[env];

router.get('/Transportes', (req, res) => {
    const data = {
        Page: 'Catalogs/Transports',
        Categoría: 'Catálogos',
        Modulo: 'Transportes',
        JSFile: '/js/Catalogs/Transports.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,

    };
    res.render('views', data);
});

router.get('/LineasDeTransporte', (req, res) => {
    const data = {
        Page: 'Catalogs/TransportLines',
        Categoría: 'Catálogos',
        Modulo: 'Líneas de Transporte',
        JSFile: '/js/Catalogs/TransportLines.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,

    };
    res.render('views', data);
});

router.get('/Choferes', (req, res) => {
    const data = {
        Page: 'Catalogs/Drivers',
        Categoría: 'Catálogos',
        Modulo: 'Choferes',
        JSFile: '/js/Catalogs/Drivers.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,

    };
    res.render('views', data);
});

router.get('/Documentos', (req, res) => {
    const data = {
        Page: 'Catalogs/Documents',
        Categoría: 'Catálogos',
        Modulo: 'Documentos',
        JSFile: '/js/Catalogs/Documents.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
    };
    res.render('views', data);
});

router.get('/Roles', (req, res) => {
    const data = {
        Page: 'Catalogs/Roles',
        Categoría: 'Catálogos',
        Modulo: 'Roles',
        JSFile: '/js/Catalogs/Roles.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
    };
    res.render('views', data);
});

module.exports = router;