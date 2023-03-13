const sql = require('mssql');
const config = require('../../config/database');

const addOrUpdateAppointment = async (appointment) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Id', sql.Int, appointment.Id)
            .input('ClientId', sql.Int, appointment.ClientId)
            .input('LineId', sql.Int, appointment.LineId)
            .input('TransportId', sql.Int, appointment.TransportId)
            .input('DriverId', sql.Int, appointment.DriverId)
            .input('ProductId', sql.Int, appointment.ProductId)
            .input('HarvestId', sql.Int, appointment.HarvestId)
            .input('CapacityId', sql.Int, appointment.CapacityId)
            .input('Day', sql.Date, appointment.Day)
            .input('ScheduleId', sql.Int, appointment.ScheduleId)
            .execute('SpAddOrUpdateDate');

        return result.recordset[0];

    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    addOrUpdateAppointment: addOrUpdateAppointment
};
