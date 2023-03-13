const sql = require('mssql');
const config = require('../../config/database');

const addOrUpdateTransport = async (transport) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('TransportId', sql.Int, transport.TransportId)
            .input('UserId', sql.Int, transport.UserId)
            .input('TransportTypeId', sql.Int, transport.TransportTypeId)
            .input('TransportPlate1', sql.VarChar(20), transport.TransportPlate1)
            .input('TransportPlate2', sql.VarChar(20), transport.TransportPlate2)
            .input('TransportPlate3', sql.VarChar(20), transport.TransportPlate3)
            .input('Capacity', sql.Int, transport.Capacity)
            .input('StatusId', sql.Int, transport.StatusId)
            .execute('SpAddOrUpdateTransport');

        return result.recordset;

    } catch (error) {
        console.error(error);
    }
};

const getTransports = async (TransportId,UserId) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('TransportId', sql.Int, TransportId)
            .input('UserId', sql.Int, UserId)
            .execute('SpGetTransports');

        return result.recordset;
    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    addOrUpdateTransport: addOrUpdateTransport,
    getTransports: getTransports
};
