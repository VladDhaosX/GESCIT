const sql = require('mssql');
const config = require('../../config/database');

const addOrUpdateTransportLine = async (transportLine) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Id', sql.Int, transportLine.Id)
            .input('ClientId', sql.Int, transportLine.ClientId)
            .input('LineName', sql.VarChar(255), transportLine.LineName)
            .input('LineType', sql.VarChar(255), transportLine.LineType)
            .input('StatusId', sql.Int, transportLine.StatusId)
            .execute('SpAddOrUpdateTransportLine');

        return result;

    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    addOrUpdateTransportLine: addOrUpdateTransportLine
};
