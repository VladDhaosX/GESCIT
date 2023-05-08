const express = require('express');
const app = express();
const path = require('path');
const router = require('./app/routes/routes');

const env = process.env.env || 'LOCAL';
const config = require('./config/env')[env];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'html'));

app.use(config.BasePath + '/', express.static(__dirname + '/public'));

app.use(config.BasePath, router);

app.listen(process.env.PORT || 3000, () => {
    console.log('La aplicación está escuchando en el puerto 3000');
});