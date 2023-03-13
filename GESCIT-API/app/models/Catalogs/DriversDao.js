const sql = require('mssql');
const config = require('../../config/database');

const addOrUpdateDriver = async (driver) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Id', sql.Int, driver.Id)
            .input('ClientId', sql.Int, driver.ClientId)
            .input('FirstName', sql.VarChar(255), driver.FirstName)
            .input('LastName', sql.VarChar(255), driver.LastName)
            .input('MiddleName', sql.VarChar(255), driver.MiddleName)
            .input('StatusId', sql.Int, driver.StatusId)
            .execute('SpAddOrUpdateDriver');

        return result.recordset[0];

    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    addOrUpdateDriver: addOrUpdateDriver
};
