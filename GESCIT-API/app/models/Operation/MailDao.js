const sql = require('mssql');
const config = require('../../config/database');

module.exports = {
    GetClientInfo: async (DateId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('DateId', sql.Int, DateId)
                .execute('spGetClientInfo');

            return {
                "success": true,
                "data": result.recordset,
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al crear o actualizar la cita.",
                "info": error.message
            }
        }
    }
};