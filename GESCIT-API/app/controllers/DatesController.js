const DatesDao = require('../models/DatesDao');
const TransportDao = require('../models/Catalogs/TransportDao');

module.exports = {
    addOrUpdateDate: async (req, res) => {
        try {
            const { date } = req.body;
            const result = await DatesDao.addOrUpdateDate(date);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear o actualizar la cita.' });
        }
    },

    GetSheduleTimes: async (req, res) => {
        try {
            const { OperationTypeId } = req.body;
            const result = await DatesDao.GetSheduleTimes(OperationTypeId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los horarios.' });
        }
    },

    GetOperationTypes: async (req, res) => {
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetOperationTypes(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los tipos de operación.' });
        }
    },

    GetProducts: async (req, res) => {
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetProducts(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los productos.' });
        }
    },

    GetTransportLines: async (req, res) => {
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetTransportLines(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las líneas de transporte.' });
        }
    },

    GetTransports: async (req, res) => {
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetTransports(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los transportes.' });
        }
    },

    GetDrivers: async (req, res) => {
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetDrivers(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los conductores.' });
        }
    },

    GetDates: async (req, res) => {
        try {
            const { userId, StartDate, EndDate, Status } = req.body;
            const result = await DatesDao.GetDates(userId, StartDate, EndDate, Status);
            console.log(result.data[0]);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las citas.' });
        }
    },

    GetTransportsByType: async (req, res) => {
        try {
            const { userId, TransportTypeId } = req.body;
            const response = await DatesDao.GetTransportsByType(userId, TransportTypeId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    GetTransportTypes: async (req, res) => {
        try {
            const response = await TransportDao.getTransportType();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    IsAppointmentTimeAvailableHandler: async (req, res) => {
        try {
            const response = await DatesDao.IsAppointmentTimeAvailable();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    ScheduleAvailables: async (req, res) => {
        try {
            const { OperationTypeId, TransportTypeId } = req.body;
            const response = await DatesDao.ScheduleAvailables(OperationTypeId, TransportTypeId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    CancelDate: async (req, res) => {
        try {
            const { dateId } = req.body;
            const response = await DatesDao.CancelDate(dateId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    GetSchedules: async (req, res) => {
        try {
            const response = await DatesDao.GetSchedules();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // GetAllHoursOfSchedule: async (ScheduleId) => {
    GetAllHoursOfSchedule: async (req, res) => {
        try {
            const { ScheduleId } = req.body;
            const response = await DatesDao.GetAllHoursOfSchedule(ScheduleId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    AssignDateHour: async (req, res) => {
        try {
            const { DateId, Hour, Minutes } = req.body;
            console.log(DateId, Hour, Minutes);
            const response = await DatesDao.AssignDateHour(DateId, Hour, Minutes);
            console.log(response);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
