const sql = require('mssql');
const config = require('../config/database');

module.exports = {
    addOrUpdateDate: async (appointment) => {
        console.log('appointment: ', appointment);
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('DateId', sql.Int, appointment.DateId)
                .input('UserId', sql.Int, appointment.userId)
                .input('ScheduleTimeId', sql.Int, appointment.sheduleTimeId)
                .input('OperationTypeId', sql.Int, appointment.operationTypeId)
                .input('ProductId', sql.Int, appointment.productId)
                .input('TransportLineId', sql.Int, appointment.transportLineId)
                .input('TransportId', sql.Int, appointment.transportId)
                .input('TransportPlate', sql.VarChar(50), appointment.TransportPlate)
                .input('TransportPlate2', sql.VarChar(50), appointment.TransportPlate2)
                .input('TransportPlate3', sql.VarChar(50), appointment.TransportPlate3)
                .input('DriverId', sql.Int, appointment.driverId)
                .input('Volume', sql.VarChar(50), appointment.Volume)
                .output('Success', sql.Bit, '0')
                .output('Message', sql.VarChar(100))
                .execute('SpAddOrUpdateDates');

            return {
                "success": result.output.Success,
                "message": result.output.Message,
                "data": result.recordset,
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al crear o actualizar la cita.",
                "info": error.message
            }
        }
    },
    GetSheduleTimes: async (OperationTypeId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('OperationTypeId', sql.Int, OperationTypeId)
                .execute('SpGetSheduleTime');

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
    GetOperationTypes: async () => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .execute('SpGetOperationTypes');

            return {
                "success": true,
                "message": "Operaciones obtenidas correctamente.",
                "data": result.recordset,
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al obtener las Operaciones.",
                "info": error.message
            }
        }
    },
    GetProducts: async () => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .execute('SpGetProducts');

            return {
                "success": true,
                "message": "Productos obtenidos correctamente.",
                "data": result.recordset,
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al obtener los Productos.",
                "info": error.message
            }
        }
    },
    GetTransportLines: async (userId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('UserId', sql.Int, userId)
                .execute('SpGetTransportLines');

            return {
                "success": true,
                "message": "Lineas de transporte obtenidas correctamente.",
                "data": result.recordset,
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al obtener las Lineas de transporte.",
                "info": error.message
            }
        }
    },
    GetTransports: async (userId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('UserId', sql.Int, userId)
                .execute('SpGetTransports');

            return {
                "success": true,
                "message": "Transportes obtenidos correctamente.",
                "data": result.recordset,
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al obtener los Transportes.",
                "info": error.message
            }
        }
    },
    GetDrivers: async (userId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('UserId', sql.Int, userId)
                .execute('SpGetDrivers');

            return {
                "success": true,
                "message": "Choferes obtenidos correctamente.",
                "data": result.recordset,
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al obtener los Choferes.",
                "info": error.message
            }
        }
    },
    GetDates: async (userId, StartDate, EndDate) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('UserId', sql.Int, userId)
                .input('StartDate', sql.VarChar(sql.MAX), StartDate)
                .input('EndDate', sql.VarChar(sql.MAX), EndDate)
                .execute('SpGetDates');

            return {
                "success": true,
                "message": "Citas obtenidas correctamente.",
                "data": result.recordset,
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al obtener los Choferes.",
                "info": error.message
            }
        }
    },
    GetTransportsByType: async (UserId, TransportTypeId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('UserId', sql.Int, UserId)
                .input('TransportTypeId', sql.Int, TransportTypeId)
                .execute('GetTransportsByType');

            return {
                "success": true,
                "message": "Citas obtenidas correctamente.",
                "data": result.recordset,
            }

        } catch (error) {
            return {
                "success": false,
                "message": "Error al obtener los Choferes.",
                "info": error.message
            }
        }
    },
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
    ScheduleAvailables: async (OperationTypeId, TransportTypeId) => {
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
    CancelDate: async (DateId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('DateId', sql.Int, DateId)
                .output('Success', sql.Bit)
                .output('Message', sql.VarChar(sql.MAX))
                .execute('SpCancelDate');

            return {
                "success": result.output.Success,
                "message": result.output.Message,
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
    AssignDateHour: async (DateId, Hour, Minutes) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('DateId', sql.Int, DateId)
                .input('Hour', sql.Int, Hour)
                .input('Minutes', sql.Int, Minutes)
                .output('Success', sql.Bit)
                .output('Message', sql.VarChar(sql.MAX))
                .execute('SpAssignDateHour');

            return {
                "success": result.output.Success,
                "message": result.output.Message,
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
