const DatesDao = require('../../models/Operation/DatesDao');


module.exports = {

    IsAppointmentTimeAvailableHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Horarios']
        // #swagger.summary = 'Validar si el horario está disponible.'
        // #swagger.description = 'Endpoint que valida si el horario está disponible.'
        try {
            const response = await DatesDao.IsAppointmentTimeAvailable();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message, info: error });
        }
    },
    
    ScheduleAvailableHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Horarios']
        // #swagger.summary = 'Obtener horarios disponibles.'
        // #swagger.description = 'Endpoint que obtiene los horarios disponibles por el tipo de Operación y el Tipo de Transporte.'
        try {
            const { OperationTypeId, TransportTypeId } = req.body;
            const response = await DatesDao.ScheduleAvailable(OperationTypeId, TransportTypeId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message, info: error });
        }
    },

    GetSchedulesHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Horarios']
        // #swagger.summary = 'Obtener horarios.'
        // #swagger.description = 'Endpoint que obtiene los horarios.'
        try {
            const response = await DatesDao.GetSchedules();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message, info: error });
        }
    },

    GetAllHoursOfScheduleHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Horarios']
        // #swagger.summary = 'Obtener horas de un horario.'
        // #swagger.description = 'Endpoint que obtiene las horas de un horario.'
        try {
            const { ScheduleId } = req.body;
            const response = await DatesDao.GetAllHoursOfSchedule(ScheduleId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message, info: error });
        }
    },

    GetScheduleTimesHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        try {
            const { OperationTypeId } = req.body;
            const result = await DatesDao.GetScheduleTimes(OperationTypeId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los horarios.', info: error });
        }
    },

};