require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options:{
      trustedconnection: false,
      enableArithAbort: true,
      encrypt: false
  }
};

const sql = require('mssql');

(async function () {
  try {
    await sql.connect(config);
    console.log('Conectado a la base de datos');
  } catch (err) {
    console.log('Error al conectar a la base de datos:', err);
  }
})();

module.exports = sql;