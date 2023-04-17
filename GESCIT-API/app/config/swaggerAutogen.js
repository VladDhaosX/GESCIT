const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger-output.json';
const endpointsFiles = ['./app/routes/routes.js'];
const swaggerDoc = require('./swaggerDoc');

function generateSwaggerOutput() {
  return new Promise((resolve, reject) => {
    
    delete require.cache[require.resolve('./swaggerDoc')]; 
    const updatedswaggerDoc = require('./swaggerDoc');
    swaggerAutogen(outputFile, endpointsFiles, updatedswaggerDoc).then(() => {
      resolve();
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports = generateSwaggerOutput;