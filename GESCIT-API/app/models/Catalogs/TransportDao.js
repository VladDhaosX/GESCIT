const sql = require('mssql');
const config = require('../../config/database');

const addOrUpdateTransport = async (transport) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('TransportId', sql.Int, transport.TransportId)
            .input('ClientId', sql.Int, transport.ClientId)
            .input('TransportType', sql.VarChar(50), transport.TransportType)
            .input('TransportPlate', sql.VarChar(20), transport.TransportPlate)
            .input('TransportPlate2', sql.VarChar(20), transport.TransportPlate2)
            .input('TransportPlate3', sql.VarChar(20), transport.TransportPlate3)
            .input('Capacity', sql.Int, transport.Capacity)
            .input('StatusId', sql.Int, transport.StatusId)
            .execute('SpAddOrUpdateTransport');

        return result;

    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    addOrUpdateTransport: addOrUpdateTransport
};
