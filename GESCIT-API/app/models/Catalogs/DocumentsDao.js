const sql = require('mssql');
const config = require('../../config/database');

const addOrUpdateDocument = async (document) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Id', sql.Int, document.Id)
            .input('DocumentName', sql.VarChar(255), document.DocumentName)
            .input('DocumentType', sql.VarChar(50), document.DocumentType)
            .execute('SpAddOrUpdateDocument');

        return result.recordset[0];

    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    addOrUpdateDocument: addOrUpdateDocument
};
