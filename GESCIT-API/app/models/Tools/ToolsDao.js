const sql = require('mssql');
const config = require('../../config/database');

module.exports = {
    GetAllSchedulesAvailable: async (date) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Date', sql.DateTime, date)
                .execute('SpAllSchedulesAvailables');

            return {
                "success": true,
                "message": "Horarios disponibles obtenidos correctamente.",
                "data": result.recordset,
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al obtener los horarios disponibles.",
                "info": error.message
            }
        }
    },
};