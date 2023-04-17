const ScheduleDao = require('../../models/Operation/ScheduleDao');


module.exports = {

    IsAppointmentTimeAvailableHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Horarios']
        // #swagger.summary = 'Validar el horario actual.'
        // #swagger.description = 'Endpoint que valida si la hora actual se encuentra entre las 12 y 5.'
        try {
            const response = await ScheduleDao.IsAppointmentTimeAvailable();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message, info: error });
        }
    },
    
    ScheduleAvailableHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Horarios']
        // #swagger.summary = 'Obtener horarios disponibles.'
        // #swagger.description = 'Endpoint que recibe el Tipo de Operación y el Tipo de Transporte y devuelve los horarios con citas disponibles.'
        try {
            const { OperationTypeId, TransportTypeId } = req.body;
            const response = await ScheduleDao.ScheduleAvailable(OperationTypeId, TransportTypeId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message, info: error });
        }
    },

    GetSchedulesHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Horarios']
        // #swagger.summary = 'Obtener horarios.'
        // #swagger.description = 'Endpoint que devuelve todos los horarios.'
        try {
            const response = await ScheduleDao.GetSchedules();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message, info: error });
        }
    },

    GetAllHoursOfScheduleHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Horarios']
        // #swagger.summary = 'Obtener horas de un horario.'
        // #swagger.description = 'Endpoint que obtiene las horas que hay dentro de un horario.'
        try {
            const { ScheduleId } = req.body;
            const response = await ScheduleDao.GetAllHoursOfSchedule(ScheduleId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message, info: error });
        }
    },

    GetScheduleTimesHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        // #swagger.summary = 'Obtener horarios disponibles por el Tipo de Operación'
        // #swagger.description = 'Endpoint que obtiene las horas que hay dentro de un horario dependiendo el Tipo de Operación.'
        try {
            const { OperationTypeId } = req.body;
            const result = await ScheduleDao.GetScheduleTimes(OperationTypeId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los horarios.', info: error });
        }
    },

};