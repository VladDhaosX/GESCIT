const app = require('./app/app');
require('./app/config/database');

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});