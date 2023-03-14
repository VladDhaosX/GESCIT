const sql = require('mssql');
const config = require('../../config/database');

const addOrUpdateDriver = async (driver) => {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();
        request.input('Id', sql.Int, driver.Id);
        request.input('ClientId', sql.Int, driver.ClientId);
        request.input('Name', sql.VarChar(255), driver.Name);
        request.input('LastName', sql.VarChar(255), driver.LastName);
        request.input('SecondLastName', sql.VarChar(255), driver.SecondLastName);
        request.input('StatusId', sql.Int, driver.StatusId);
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
            message: error.Message
        };;
    }
};

module.exports = {
    addOrUpdateDriver: addOrUpdateDriver
};
