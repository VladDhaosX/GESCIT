const sql = require('mssql');
const config = require('../../config/database');

const addOrUpdateTransportLine = async (transportLine) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('TransportLineId', sql.Int, transportLine.TransportLineId)
            .input('UserId', sql.Int, transportLine.UserId)
            .input('Name', sql.VarChar(255), transportLine.Name)
            .input('LineTypeId', sql.Int, transportLine.LineTypeId)
            .input('StatusId', sql.Int, transportLine.StatusId)
            .output('Success', sql.Bit)
            .output('Message', sql.VarChar(50))
            .execute('SpAddOrUpdateTransportLine');

        return {
            success: result.output.Success,
            message: result.output.Message,
            data: result.recordset
        };
    } catch (error) {
        return {
          success: false,
          message: error.message,
          error: error,
        };
    }
};

const getTransportLines = async (UserId) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('UserId', sql.Int, UserId)
            .execute('SpGetTransportLines');

            return {
                success: true,
                message: "Consulta realizada con exito.",
                data: result.recordset
            };
    } catch (error) {
        return {
          success: false,
          message: error.message,
          error: error,
        };
    }
};


module.exports = {
    addOrUpdateTransportLine: addOrUpdateTransportLine,
    getTransportLines: getTransportLines,
};
