const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'html'));
app.use(express.static(__dirname + '/public'));

app.get('/Clients', (req, res) => {
    console.log('Se accedió a la ruta /views');
    const data = {
        Page: './Catalogs/Clients'
    };
    res.render('views', data);
});

app.get('/Transports', (req, res) => {
    const data = {
        Page: './Catalogs/Transports',
        Categoria: 'Catalogos',
        Modulo: 'Transportes',
        JSFile: '../js/Catalogs/Transports.js'
    };
    res.render('views', data);
});

app.get('/Permissions', (req, res) => {
    const data = {
        Page: './Configuration/Permissions',
        Categoria: 'Configuracion',
        Modulo: 'Permisos',
        JSFile: '../js/Configuration/Permissions.js'
    };
    res.render('views', data);
});

app.get('/TransportLines', (req, res) => {
    const data = {
        Page: './Catalogs/TransportLines',
        Categoria: 'Catalogos',
        Modulo: 'Lineas de Transporte',
        JSFile: '../js/Catalogs/TransportLines.js'
    };
    res.render('views', data);
});

app.get('/', (req, res) => {
    res.redirect('/Permissions');
  });
app.listen(3000, () => {
    console.log('La aplicación está escuchando en el puerto 3000');
});
