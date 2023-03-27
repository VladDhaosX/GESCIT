const sql = require('mssql');
const config = require('../../config/database');

module.exports = {
    addOrUpdateTransportLine: async (TransportLine) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .output('TransportLineId', sql.Int, TransportLine.TransportLineId)
                .output('TemporalDocumentId', sql.Int, TransportLine.TemporalDocumentId)
                .input('UserId', sql.Int, TransportLine.userId)
                .input('Name', sql.VarChar(255), TransportLine.Name)
                .input('LineTypeId', sql.Int, TransportLine.TransportLineTypeId)
                .output('Success', sql.Bit)
                .output('Message', sql.VarChar(100))
                .execute('SpAddOrUpdateTransportLine');

            return {
                TransportLineId: result.output.TransportLineId,
                TemporalDocumentId: result.output.TemporalDocumentId,
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
    },

    getTransportLines: async (userId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('UserId', sql.Int, userId)
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
    },

    getTransportLineTypes: async () => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .execute('SpGetTransportLineTypes');

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
    },
};
