const MailDao = require('../../models/Operation/MailDao');
const fetch = require("node-fetch");

module.exports = {
    GetClientInfo: async (DateId) => {
        // #swagger.tags = ['Operaciones']
        try {
            const result = await MailDao.GetClientInfo(DateId);
            return result;
        } catch (error) {
            console.log(error);
        }
    },
    sendMail: async (recipientsList, subject, body, isBodyHtml) => {
        // #swagger.tags = ['Operaciones']
        try {
            const response = await fetch('https://portalesdemo.almer.com.mx/AlmerNotificationsApi/Email/SendMailNotification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipientsList: recipientsList,
                    subject: subject,
                    body: body,
                    isBodyHtml: isBodyHtml
                })
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    },
    sendSMS: async (message, phoneNumber) => {
        // #swagger.tags = ['Operaciones']
        try {
            const response = await fetch('https://portalesdemo.almer.com.mx/AlmerNotificationsApi/SMS/SendSMSMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    phoneNumber: phoneNumber
                })
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    },
    ReSendMailHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        try {
            const { DateId, Mail } = req.body;
            const response = await MailDao.GetClientInfo(DateId);
            const Client = response.data[0];

            const recipientsList = [Mail, 'abernal@almer.com.mx'];
            const subject = 'Cita Almer';
            const body = `Estimado/a cliente ${Client.Cliente}. Le informamos que hemos asignado su cita para la línea de transporte ${Client['Línea de Transporte']} a la(s) ${Client.Hora} del día ${Client.Dia}. Folio de cita: [${Client.Folio}] Agradecemos su preferencia y quedamos a su disposición para cualquier consulta o requerimiento adicional.`;
            const isBodyHtml = false;
            const fetchResponse = await fetch('https://portalesdemo.almer.com.mx/AlmerNotificationsApi/Email/SendMailNotification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipientsList: recipientsList,
                    subject: subject,
                    body: body,
                    isBodyHtml: isBodyHtml
                })
            });
            const mailResponse = await fetchResponse.json();
            res.json(mailResponse);
        } catch (error) {
            console.log(error);
        }
    },
    ReSendSMSHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        try {
            const { DateId, PhoneNumber } = req.body;
            const response = await MailDao.GetClientInfo(DateId);
            const Client = response.data[0];

            const message = `Estimado/a cliente ${Client.Cliente}. Le informamos que hemos asignado su cita para la línea de transporte ${Client['Línea de Transporte']} a la(s) ${Client.Hora} del día ${Client.Dia}. Folio de cita: [${Client.Folio}] Agradecemos su preferencia y quedamos a su disposición para cualquier consulta o requerimiento adicional.`;
            const fetchResponse = await fetch('https://portalesdemo.almer.com.mx/AlmerNotificationsApi/SMS/SendSMSMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    phoneNumber: PhoneNumber
                })
            });
            const smsResponse = await fetchResponse.json();
            res.json(smsResponse);
        } catch (error) {
            console.log(error);
        }
    }
};
