const DatesDao = require('../../models/Dates/DatesDao');

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
            const { userId } = req.body;
            const result = await DatesDao.GetSheduleTimes(userId);
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
            const { userId,StartDate,EndDate } = req.body;
            const result = await DatesDao.GetDates(userId,StartDate,EndDate);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las citas.' });
        }
    }
};
