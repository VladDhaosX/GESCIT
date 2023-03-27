const sql = require('mssql');
const config = require('../../config/database');

module.exports = {
    addOrUpdateDriver: async (driver) => {
        try {
            const pool = await sql.connect(config);
            const request = pool.request();
            request.input('UserId', sql.Int, driver.UserId);
            request.input('TemporalDocumentId', sql.Int, driver.TemporalDocumentId);
            request.input('DriverId', sql.Int, driver.DriverId);
            request.input('FirstName', sql.VarChar(255), driver.FirstName);
            request.input('LastName', sql.VarChar(255), driver.LastName);
            request.input('SecondLastName', sql.VarChar(255), driver.SecondLastName);
            request.input('PhoneNumber', sql.VarChar(20), driver.PhoneNumber);
            request.output('Success', sql.Bit);
            request.output('Message', sql.VarChar(100));
            const result = await request.execute('SpAddOrUpdateDriver');

            return {
                success: result.output.Success,
                message: result.output.Message
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },
    GetDrivers: async (UserId) => {
        try {
            const pool = await sql.connect(config);
            const request = pool.request();
            request.input('UserId', sql.Int, UserId);
            const result = await request.execute('SpGetDrivers');

            return {
                success: true,
                data: result.recordset
            };
        } catch (error) {
            return {
                success: false,
                message: error
            };
        }
    },
};
