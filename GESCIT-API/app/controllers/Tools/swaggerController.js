const generateSwaggerOutput = require('../../config/swaggerAutogen');
const swaggerUi = require('swagger-ui-express');

module.exports = {
    async swagger(req, res) {
        // #swagger.ignore = true
        try {
            delete require.cache[require.resolve('../../../swagger-output')];
            const updatedSwaggerFile = require('../../../swagger-output');
            res.send(swaggerUi.generateHTML(updatedSwaggerFile));
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error al realizar el login.', info: error.message });
        };
    },

    async regenSwagger(req, res) {
        try {
            // #swagger.ignore = true
            await generateSwaggerOutput();
            delete require.cache[require.resolve('../../../swagger-output')];
            const updatedSwaggerFile = require('../../../swagger-output');
            res.send(swaggerUi.generateHTML(updatedSwaggerFile));
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al generar la documentación de Swagger.');
        }
    }

}