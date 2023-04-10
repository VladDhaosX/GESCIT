const DatesDao = require('../../models/Operation/DatesDao');
const TransportDao = require('../../models/Catalogs/TransportDao');
const MailController = require('./MailController');

module.exports = {
    addOrUpdateDateHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Citas']
        // #swagger.summary = 'Agregar o actualizar una cita.'
        // #swagger.description = 'Endpoint que recibe los datos de una cita, valida cada dato y si el horario está disponible, crea o actualiza la cita.'
        try {
            const { DateId, userId, ScheduleTimeId, operationTypeId, productId, transportLineId, transportId, TransportPlate, TransportPlate2, TransportPlate3, driverId, Volume } = req.body;
            const result = await DatesDao.addOrUpdateDate(DateId, userId, ScheduleTimeId, operationTypeId, productId, transportLineId, transportId, TransportPlate, TransportPlate2, TransportPlate3, driverId, Volume);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear o actualizar la cita.', info: error });
        }
    },

    GetDatesHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Citas']
        // #swagger.summary = 'Obtener citas.'
        // #swagger.description = 'Endpoint que filtra las citas por Usuario, Fecha de inicio, Fecha de fin y estatus.'
        try {
            const { userId, StartDate, EndDate, Status } = req.body;
            const result = await DatesDao.GetDates(userId, StartDate, EndDate, Status);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las citas.', info: error });
        }
    },

    CancelDateHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Citas']
        // #swagger.summary = 'Cancelar una cita.'
        // #swagger.description = 'Endpoint que recibe el Id de la cita y la cancela.'
        try {
            const { dateId } = req.body;
            const response = await DatesDao.CancelDate(dateId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message, info: error });
        }
    },

    AssignDateHourHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Citas']
        // #swagger.summary = 'Asignar hora a una cita.'
        // #swagger.description = 'Endpoint que recibe el Id de la cita, la hora y los minutos y los asigna a la cita, además de enviar un correo y un SMS al cliente.'
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
            res.status(500).json({ message: error.message, info: error });
        }
    },

    GetClientInfoByFolioHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Citas']
        // #swagger.summary = 'Obtener información del cliente por folio.'
        // #swagger.description = 'Endpoint que obtiene la información del cliente por folio.'
        try {
            const { Folio } = req.body;
            const response = await DatesDao.GetClientInfoByFolio(Folio);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message, info: error });
        }
    },

    UpdateDateStatusHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones/Citas']
        // #swagger.summary = 'Actualizar el estatus de una cita.'
        // #swagger.description = 'Endpoint que recibe el Id de la cita y el nuevo estatus y los actualiza.'
        try {
            const { DateId, NewStatus } = req.body;
            const response = await DatesDao.UpdateDateStatus(DateId, NewStatus);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message, info: error });
        }
    },

    GetOperationTypesHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetOperationTypes(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los tipos de operación.', info: error });
        }
    },

    GetProductsHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetProducts(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los productos.', info: error });
        }
    },

    GetTransportLinesHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetTransportLines(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las líneas de transporte.', info: error });
        }
    },

    GetTransportsHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetTransports(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los transportes.', info: error });
        }
    },

    GetDriversHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        try {
            const { userId } = req.body;
            const result = await DatesDao.GetDrivers(userId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los conductores.', info: error });
        }
    },

    GetTransportsByTypeHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        try {
            const { userId, TransportTypeId } = req.body;
            const response = await DatesDao.GetTransportsByType(userId, TransportTypeId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message, info: error });
        }
    },

    GetTransportTypesHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        try {
            const response = await TransportDao.getTransportType();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message, info: error });
        }
    },
};
