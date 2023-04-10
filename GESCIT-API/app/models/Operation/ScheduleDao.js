const sql = require('mssql');
const config = require('../../config/database');


module.exports = {

    IsAppointmentTimeAvailable: async () => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .output('IsTimeAvailable', sql.Bit)
                .execute('SpIsAppointmentTimeAvailable');

            return {
                "success": true,
                "message": "Consulta obtenida correctamente.",
                "data": result.output
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al obtener los datos.",
                "info": error.message
            }
        }
    },

    GetScheduleTimes: async (OperationTypeId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('OperationTypeId', sql.Int, OperationTypeId)
                .execute('SpGetScheduleTime');

            return {
                "success": true,
                "message": "Horarios obtenidos correctamente.",
                "data": result.recordset,
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al obtener los horarios.",
                "info": error.message
            }
        }
    },

    ScheduleAvailable: async (OperationTypeId, TransportTypeId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('OperationTypeId', sql.Int, OperationTypeId)
                .input('TransportTypeId', sql.Int, TransportTypeId)
                .execute('SpSchedulesAvailables');

            return {
                "success": true,
                "message": "Consulta obtenida correctamente.",
                "data": result.recordset
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al obtener los datos.",
                "info": error.message
            }
        }
    },

    GetSchedules: async () => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .execute('SpGetSchedules');

            return {
                "success": true,
                "message": "Consulta obtenida correctamente.",
                "data": result.recordset
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al obtener los datos.",
                "info": error.message
            }
        }
    },

    GetAllHoursOfSchedule: async (ScheduleId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('ScheduleId', sql.Int, ScheduleId)
                .execute('SpGetAllHoursOfSchedule');

            return {
                "success": true,
                "message": "Consulta obtenida correctamente.",
                "data": result.recordset
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al obtener los datos.",
                "info": error.message
            }
        }
    },

};