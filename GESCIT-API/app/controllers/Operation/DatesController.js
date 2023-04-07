const DatesDao = require('../../models/Operation/DatesDao');
const TransportDao = require('../../models/Catalogs/TransportDao');
const MailController = require('./MailController');

module.exports = {
    addOrUpdateDateHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { date } = req.body;
            const result = await DatesDao.addOrUpdateDate(date);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear o actualizar la cita.' });
        }
    },

    GetScheduleTimesHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { OperationTypeId } = req.body;
            const result = await DatesDao.GetScheduleTimes(OperationTypeId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los horarios.' });
        }
    },

    GetOperationTypesHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetOperationTypes(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los tipos de operación.' });
        }
    },

    GetProductsHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetProducts(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los productos.' });
        }
    },

    GetTransportLinesHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetTransportLines(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las líneas de transporte.' });
        }
    },

    GetTransportsHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetTransports(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los transportes.' });
        }
    },

    GetDriversHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetDrivers(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los conductores.' });
        }
    },

    GetDatesHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { userId, StartDate, EndDate, Status } = req.body;
            const result = await DatesDao.GetDates(userId, StartDate, EndDate, Status);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las citas.' });
        }
    },

    GetTransportsByTypeHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { userId, TransportTypeId } = req.body;
            const response = await DatesDao.GetTransportsByType(userId, TransportTypeId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    GetTransportTypesHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const response = await TransportDao.getTransportType();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    IsAppointmentTimeAvailableHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const response = await DatesDao.IsAppointmentTimeAvailable();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    ScheduleAvailableHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { OperationTypeId, TransportTypeId } = req.body;
            const response = await DatesDao.ScheduleAvailable(OperationTypeId, TransportTypeId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    CancelDateHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { dateId } = req.body;
            const response = await DatesDao.CancelDate(dateId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    GetSchedulesHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const response = await DatesDao.GetSchedules();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    GetAllHoursOfScheduleHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { ScheduleId } = req.body;
            const response = await DatesDao.GetAllHoursOfSchedule(ScheduleId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    AssignDateHourHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { DateId, Hour, Minutes } = req.body;
            const response = await DatesDao.AssignDateHour(DateId, Hour, Minutes);

            if (!response.success) {
                const ClientInfoResponse = await MailController.GetClientInfo(DateId);
                const Client = ClientInfoResponse.data[0];
                //  DES COMENTAR EN PRODUCCIÓN
                // const recipientsList = [Client.Mail,'abernal@almer.com.mx'];
                //  DES COMENTAR EN PRODUCCIÓN
                //  COMENTAR EN PRODUCCIÓN
                const recipientsList = ['abernal@almer.com.mx'];
                //  COMENTAR EN PRODUCCIÓN
                const subject = 'Cita Almer';

                const body = `Estimado/a cliente ${Client.Cliente}. Le informamos que hemos asignado su cita para la línea de transporte ${Client['Línea de Transporte']} a la(s) ${Client.Hora} del día ${Client.Dia}. Folio de cita: [${Client.Folio}] Agradecemos su preferencia y quedamos a su disposición para cualquier consulta o requerimiento adicional.`;

                const isBodyHtml = false;
                const mailResponse = await MailController.sendMail(recipientsList, subject, body, isBodyHtml);

                const smsMessage = `Almacenadora Mercader S.A. le informa que hemos asignado su cita para la línea de transporte ${Client['Línea de Transporte']} a la(s) ${Client.Hora} del día ${Client.Dia} con el folio  [${Client.Folio}]. Agradecemos su preferencia.`;

                //  DES COMENTAR EN PRODUCCIÓN
                // const phoneNumber = Client.Teléfono;
                //  DES COMENTAR EN PRODUCCIÓN
                //  COMENTAR EN PRODUCCIÓN
                const phoneNumber = "3325799271";
                //  COMENTAR EN PRODUCCIÓN

                const smsResponse = await MailController.sendSMS(smsMessage, phoneNumber);

                // console.log('mailResponse', mailResponse);
                console.log('smsResponse', smsResponse);

            };

            res.json(response);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    },

    GetClientInfoByFolioHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { Folio } = req.body;
            const response = await DatesDao.GetClientInfoByFolio(Folio);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    UpdateDateStatusHandler: async (req, res) => {
        // #swagger.tags = ['Configuracion']
        try {
            const { DateId, NewStatus } = req.body;
            const response = await DatesDao.UpdateDateStatus(DateId, NewStatus);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

};
