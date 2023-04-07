const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger-output.json';
const endpointsFiles = ['./app/routes/routes.js'];
const swaggerDoc = require('./swaggerDoc');

swaggerAutogen(outputFile, endpointsFiles, swaggerDoc);