const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'html'));
app.use(express.static(__dirname + '/public'));

app.get('/Clients', (req, res) => {
    console.log('Se accedió a la ruta /views');
    const data = {
        Page: './Catalogos/Clientes'
    };
    res.render('views', data);
});

app.listen(3000, () => {
    console.log('La aplicación está escuchando en el puerto 3000');
});
