const swaggerJSDoc = require('swagger-jsdoc');

const definition = {
    openapi: '3.0.0',
    info: {
        title: 'Mi API',
        version: '1.0.0',
        description: 'Descripción de mi API'
    },
    host: 'localhost:8090', // Host (opcional)
    basePath: '/', // Base path (opcional)
};

const options = {
    definition,
    apis: [
        './app/config/swagger/*.js',
        './app/config/swagger/Catalogs/*.js'
    ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
