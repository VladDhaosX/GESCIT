const express = require('express');
const app = express();
const path = require('path');

const env = process.env.env || 'LOCAL';
const config = require('./config/env')[env];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'html'));

app.use(config.BasePath + '/', express.static(__dirname + '/public'));

app.get(config.BasePath + '/Clients', (req, res) => {
    const data = {
        Page: './Catalogs/Clients',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
    };
    res.render('views', data);
});

app.get(config.BasePath + '/Transports', (req, res) => {
    const data = {
        Page: './Catalogs/Transports',
        Categoria: 'Catálogos',
        Modulo: 'Transportes',
        JSFile: './js/Catalogs/Transports.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,

    };
    res.render('views', data);
});

app.get(config.BasePath + '/Permissions', (req, res) => {
    const data = {
        Page: './Configuration/Permissions',
        Categoria: 'Configuracion',
        Modulo: 'Permisos',
        JSFile: './js/Configuration/Permissions.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,

    };
    res.render('views', data);
});

app.get(config.BasePath + '/TransportLines', (req, res) => {
    const data = {
        Page: './Catalogs/TransportLines',
        Categoria: 'Catálogos',
        Modulo: 'Líneas de Transporte',
        JSFile: './js/Catalogs/TransportLines.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,

    };
    res.render('views', data);
});

app.get(config.BasePath + '/Drivers', (req, res) => {
    const data = {
        Page: './Catalogs/Drivers',
        Categoria: 'Catálogos',
        Modulo: 'Choferes',
        JSFile: './js/Catalogs/Drivers.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,

    };
    res.render('views', data);
});

app.get(config.BasePath + '/login', (req, res) => {
    const data = {
        JSFile: './js/Configuration/login.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,

    };
    res.render('login', data);
});

app.get(config.BasePath + '/Dates', (req, res) => {
    const data = {
        Page: './Dates/Dates',
        Categoria: 'Gestor',
        Modulo: 'Citas',
        JSFile: './js/Dates/Dates.js',
        BasePath: config.BasePath,
        UrlApi: config.urlApi,
    };
    res.render('views', data);
});

app.get(config.BasePath + '/', (req, res) => {
    res.redirect(config.BasePath + '/login');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('La aplicación está escuchando en el puerto 3000');
});
