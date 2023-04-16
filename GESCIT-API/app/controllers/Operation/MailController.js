const MailDao = require('../../models/Operation/MailDao');
const fetch = require("node-fetch");

function plantilla(AssignedDate, AssignedTime, OperationType, TransportLine, Transport, TransportPlate, DriverName, ProductType, ProductVolume, ClientName, Folio) {
    return `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="x-apple-disable-message-reformatting">
        <title></title>
        <!--[if mso]> 
    <noscript> 
    <xml> 
    <o:OfficeDocumentSettings> 
    <o:PixelsPerInch>96</o:PixelsPerInch> 
    </o:OfficeDocumentSettings> 
    </xml> 
    </noscript> 
    <![endif]-->
        <style>
            table,
            td,
            div,
            h1,
            p {
                font-family: Arial, sans-serif;
            }
    
            table,
            td {
                border: 0px;
                padding: 10px;
            }
        </style>
    </head>
    
    <body style="margin:0;padding:0;">
        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
            <tr>
                <td id="AlmerLogo" align="center" style="padding:40px 0 30px 0;">
                    <img src="/emailHeader.png" alt="" width="300" style="height:auto;display:block;" />
                </td>
            </tr>
            <tr>
                <td id="InformationTable" style="padding:0;">
                    <!-- La tabla se insertará aquí -->
                    <table id="DateInfoTable" style="padding:15px;width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:center;"> 	
                        <tr>
                            <td><b>Fecha:</b></td>
                            <td><b>Horario:</b></td>
                            <td><b>Operación:</b></td>
                            <td><b>Línea de Transporte:</b></td>
                            <td><b>Transporte:</b></td>
                            <td><b>Placa del Transporte:</b></td>
                            <td><b>Chofer:</b></td>
                            <td><b>Producto:</b></td>
                            <td><b>Volumen:</b></td>
                        </tr>
                        <tr> 	     
                            <td> ${AssignedDate} </td>
                            <td> ${AssignedTime} </td>
                            <td> ${OperationType} </td>
                            <td> ${TransportLine} </td>
                            <td> ${Transport} </td>
                            <td> ${TransportPlate} </td>
                            <td> ${DriverName} </td>
                            <td> ${ProductType} </td>
                            <td> ${ProductVolume} </td>
        
                        </tr> 
                    </table> 
                </td>
            </tr>
            <tr>
                <td id="BodyText" style="padding:0;">
                    <h4>Estimad@ cliente ${ClientName}, </h4>
                    <p>&nbsp;</p>
                    <p>Le avisamos que hemos asignado su cita para la línea de transporte ${TransportLine} a las ${AssignedTime} horas del día ${AssignedDate}. </p>
                    <p>Folio de Cita: ${Folio}</p>
                    <p>Agradecemos su preferencia y quedamos a su disposición para cualquier consulta o requerimiento adicional. </p>
                    <p>&nbsp;</p>
                    <p>Atentamente,</p>
                    <p>Almacenadora Mercader S.A.</p>
                </td>
            </tr>
        </table>
    </body>
    
    </html>`;
};
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

            const recipientsList = [Mail];
            const subject = 'Cita Almer';

            console.log(Client);
            // plantilla = (AssignedDate, AssignedTime, OperationType, TransportLine, Transport, TransportPlate, DriverName, ProductType, ProductVolume, ClientName, AssignedTime, AssignedDate, Folio)
            const html = plantilla(Client.Dia, Client.Hora, Client['Operación'], Client['Línea de Transporte'], Client['Tipo de Transporte'], Client['Placa del Transporte'], Client['Chófer'], Client['Producto'], Client['Volumen'], Client.Cliente, Client.Folio);
            const body = html;
            console.log(body);
            // const body = `Estimado/a cliente ${Client.Cliente}. Le informamos que hemos asignado su cita para la línea de transporte ${Client['Línea de Transporte']} a la(s) ${Client.Hora} del día ${Client.Dia}. Folio de cita: [${Client.Folio}] Agradecemos su preferencia y quedamos a su disposición para cualquier consulta o requerimiento adicional.`;
            const isBodyHtml = true;
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
