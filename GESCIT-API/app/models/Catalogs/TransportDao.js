const sql = require('mssql');
const config = require('../../config/database');

module.exports = {
    addOrUpdateTransport: async (transport) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('TransportId', sql.Int, transport.TransportId)
                .input('TemporalDocumentId', sql.Int, transport.TemporalDocumentId)
                .input('UserId', sql.Int, transport.UserId)
                .input('TransportTypeId', sql.Int, transport.TransportTypeId)
                .input('TransportPlate1', sql.VarChar(20), transport.TransportPlate1)
                .input('TransportPlate2', sql.VarChar(20), transport.TransportPlate2)
                .input('TransportPlate3', sql.VarChar(20), transport.TransportPlate3)
                .input('Capacity', sql.Int, transport.Capacity)
                .output('Success', sql.Bit)
                .output('Message', sql.VarChar(sql.MAX))
                .execute('SpAddOrUpdateTransport');

            return {
                success: result.output.Success,
                message: result.output.Message,
                data: result.recordset,
                type: "db"
            };
        } catch (error) {
            console.error("DaoError: " + error.message);
            return {
                success: false,
                message: error.message,
                type: "DaoError"
            };
        }
    },

    getTransports: async (UserId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('UserId', sql.Int, UserId)
                .execute('SpGetTransports');

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

    getTransportType: async () => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .execute('SpGetTransportType');

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
