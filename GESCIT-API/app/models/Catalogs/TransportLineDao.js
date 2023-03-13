const sql = require('mssql');
const config = require('../../config/database');

const addOrUpdateTransportLine = async (transportLine) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('TransportLineId', sql.Int, transportLine.TransportLineId)
            .input('UserId', sql.Int, transportLine.UserId)
            .input('NameLine', sql.VarChar(255), transportLine.NameLine)
            .input('TransportLineTypeId', sql.Int, transportLine.TransportLineTypeId)
            .input('StatusId', sql.Int, transportLine.StatusId)
            .execute('SpAddOrUpdateTransportLine');

        return result.recordset;

    } catch (error) {
        console.error(error);
    }
};

const getTransportLines = async (TransportLineId, UserId ) => {
	try {
		let pool = await sql.connect(config);
		let result = await pool.request()
			.input('TransportLineId', sql.Int, TransportLineId)
			.input('UserId', sql.Int, UserId)
			.execute('SpGetTransportLines');

		return result.recordset;
	} catch (error) {
		console.error(error);
	}
};


module.exports = {
    addOrUpdateTransportLine: addOrUpdateTransportLine,
    getTransportLines: getTransportLines,
};
