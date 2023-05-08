const sql = require('mssql');
const config = require('../../config/database');

module.exports = {
    GetPresentation: async (StatusId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('StatusId', sql.Int, StatusId)
                .execute('SpGetPresentation');
            return {
                success: true,
                data: result.recordset
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
};
