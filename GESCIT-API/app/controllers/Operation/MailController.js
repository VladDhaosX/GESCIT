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
            return response;
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
            return response;
        } catch (error) {
            console.log(error);
        }
    }
};
