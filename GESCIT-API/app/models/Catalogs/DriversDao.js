const sql = require('mssql');
const config = require('../../config/database');

const addOrUpdateDriver = async (driver) => {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();
        request.input('DriverId', sql.Int, driver.DriverId);
        request.input('UserId', sql.VarChar(255), driver.UserId);
        request.input('FirstName', sql.VarChar(255), driver.FirstName);
        request.input('LastName', sql.VarChar(255), driver.LastName);
        request.input('MiddleName', sql.VarChar(255), driver.MiddleName);
        request.input('Phone', sql.VarChar(255), driver.Phone);
        request.output('Success', sql.Bit);
        request.output('Message', sql.VarChar(50));
        const result = await request.execute('SpAddOrUpdateDriver');

        return {
            success: result.output.Success,
            message: result.output.Message
        };;
    } catch (error) {
        return {
            success: false,
            message: error
        };;
    }
};

const GetDrivers = async () => {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();
        const result = await request.execute('SpGetDrivers');

        return {
            data:result.recordset
        };;
    } catch (error) {
        return {
            success: false,
            message: error
        };;
    }
};

module.exports = {
    addOrUpdateDriver: addOrUpdateDriver,
    GetDrivers
};
