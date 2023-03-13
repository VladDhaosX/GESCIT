const DatesDao = require('../../models/Dates/DatesDao');

const addOrUpdateAppointmentHandler = async (req, res) => {
    try {
        const { Id, ClientId, LineId, TransportId, DriverId, ProductId, HarvestId, CapacityId, Day, ScheduleId } = req.body;
        const appointment = { Id, ClientId, LineId, TransportId, DriverId, ProductId, HarvestId, CapacityId, Day, ScheduleId };
        const result = await DatesDao.addOrUpdateAppointment(appointment);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar o actualizar la cita.' });
    }
};

module.exports = {
    addOrUpdateAppointmentHandler: addOrUpdateAppointmentHandler
};
