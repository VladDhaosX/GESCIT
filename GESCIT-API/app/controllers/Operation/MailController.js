const MailDao = require('../../models/Operation/MailDao');
const fetch = require("node-fetch");

function plantilla(AssignedDate, AssignedTime, OperationType, TransportLine, Transport, TransportPlate, TransportPlate2, TransportPlate3, DriverName, ProductType, ProductVolume, ClientName, Folio) {
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
                font-size: 0.95em;
                color: #083D65;
            }
    
    
            table,
            td {
                border: 0px;
                padding: 10px;
                color: black;
            }
    
            .TableTitle {
                font-size: 1.2em;
            }
    
            b {
                font-size: 1.1em;
            }
    
            .customTable {
                font-size: 1.1em;
                color: #083D65;
            }
    
            .BlueRows {
                background-color: #083D65;
                color: white;
            }
        </style>
    </head>
    
    <body style="margin:0;padding:0;">
        <table role="presentation"
            style="width:100%;border-collapse:collapse;border:0px solid #cccccc;border-spacing:0;text-align:left;">
            <tr>
                <td id="AlmerLogo" align="left" style="padding:40px 0 30px 0;">
                <img src="https://portalesdemo.almer.com.mx/Gecit/assets/ALMER/logo.png" alt="" width="150" style="height:auto;display:block;" />
                </td>
            </tr>
            <tr>
                <td id="InformationTable">
                    <!-- La tabla se insertará aquí -->
                    <table id="DateInfoTable"
                        style="padding:15px;width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:center;width:100%;">
                        <tr>
                            <td class="BlueRows"></td>
                            <td class="BlueRows"></td>
                            <td class="BlueRows"></td>
                            <td class="BlueRows"></td>
                            <td colspan="3" class="BlueRows"><b class="TableTitle">Información de Cita</b></td>
                            <td class="BlueRows"></td>
                            <td class="BlueRows"></td>
                            <td class="BlueRows"></td>
                            <td class="BlueRows"></td>
                        </tr>
                        <tr>
                            <td><b>Fecha</b></td>
                            <td><b>Horario</b></td>
                            <td><b>Operación</b></td>
                            <td><b>Línea de Transporte</b></td>
                            <td><b>Transporte</b></td>
                            <td><b>Placa del Transporte</b></td>
                            <td><b>Placa Caja 1</b></td>
                            <td><b>Placa Caja 2</b></td>
                            <td><b>Chofer</b></td>
                            <td><b>Producto</b></td>
                            <td><b>Volumen</b></td>
                        </tr>
                        <tr>
                            <td> ${AssignedDate} </td>
                            <td> ${AssignedTime} </td>
                            <td> ${OperationType} </td>
                            <td> ${TransportLine} </td>
                            <td> ${Transport} </td>
                            <td> ${TransportPlate} </td>
                            <td> ${TransportPlate2} </td>
                            <td> ${TransportPlate3} </td>
                            <td> ${DriverName} </td>
                            <td> ${ProductType} </td>
                            <td> ${ProductVolume} </td>
    
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td id="BodyText" style="padding:0;" class="customTable">
                    <p>&nbsp;</p>
                    <h4>Estimado/a cliente ${ClientName}, </h4>
                    <p>&nbsp;</p>
                    <p>Le informamos que hemos asignado su cita para la línea de transporte ${TransportLine} a las
                        <b>${AssignedTime}</b> horas del día <b>${AssignedDate}</b>. </p>
                    <p>&nbsp;</p>
                    <p>Folio de Cita: <b>${Folio}</b></p>
                    <p>&nbsp;</p>
                    <p>Agradecemos su preferencia y quedamos a su disposición para cualquier consulta o requerimiento
                        adicional. </p>
                    <p>&nbsp;</p>
                    <p>Atentamente,</p>
                    <p>Almacenadora Mercader S.A.</p>
                    <p>&nbsp;</p>
                </td>
            </tr>
        </table>
    </body>
    
    <p>Almacenadora Mercader SA.</p>
    <p>Av. 18 de marzo #704</p>
    <p>Telefono: 36680700</p>
    <p>Lada Sin costo: 800 715 88 74</p>
    <p>Col. La Nogalera</p>
    <p>Guadalajara, Jalisco.</p>
    <p>CP 44470</p>

    <p>Este mensaje está dirigido exclusivamente a las direcciones de correo electrónico especificadas en los destinatarios dentro de su encabezado. Si usted ha recibido este correo electrónico por error, no deberá por ningún motivo revelar su contenido, distribuirlo, copiarlo o utilizarlo. Por favor comunique del error a la dirección de correo electrónico remitente y elimine dicho mensaje junto con cualquier documento adjunto que pudiera contener.</p>
    <p>Los derechos de privacidad y confidencialidad de la información en este mensaje no deben perderse por el hecho de haberse trasmitido de manera errónea o por mal funcionamiento de los sistemas de correo y medios de comunicación. Toda opinión que se expresa en este mensaje pertenece a la persona remitente, por lo que no debe entenderse necesariamente como una opinión de La Empresa, a menos que el remitente este autorizado para hacerlo o expresamente lo diga en el mismo mensaje. En consideración a que los mensajes enviados de manera electrónica pueden ser interceptados y manipulados, La Empresa, no se hace responsable si los mensajes llegan con demora, incompletos, eliminados o con algún programa malicioso denominado como virus informático.</p>
    <p>This message is exclusively aimed at the email addresses specified in the recipients within your header. If you have received this e-mail by mistake, you must not under any circumstances reveal its content, distribute it, copy it or use it. Please communicate the error to the email address sender and delete the message along with any attachment that could contain. The rights of privacy and confidentiality of the information in this message should not be lost by the fact of being transmitted incorrectly or malfunction of mail systems and media. All opinions expressed in this message, belongs to the sender, so it should not be understood necessarily as an opinion of the Company, unless the sender authorized to do so or explicitly say so in the same message. In consideration that messages sent electronically can be intercepted and manipulated, The Company, is not responsible if messages arrive with delay, incomplete, deleted, or any malicious program, called as computer virus.</p>
    </html>`;
};
module.exports = {
    plantilla: plantilla,
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
            const subject = 'Cita Almer ' + Client.Folio;

            // plantilla = (AssignedDate, AssignedTime, OperationType, TransportLine, Transport, TransportPlate, DriverName, ProductType, ProductVolume, ClientName, AssignedTime, AssignedDate, Folio)
            const html = plantilla(Client.Dia, Client.Hora, Client['Operación'], Client['Línea de Transporte'], Client['Tipo de Transporte'], Client['Placa de Transporte'], Client['Placa de Caja #1'], Client['Placa de Caja #2'], Client['Chófer'], Client['Producto'], Client['Volumen'], Client.Cliente, Client.Folio);
            const body = html;
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

            // const message = `Estimado/a cliente ${Client.Cliente}. Le informamos que hemos asignado su cita para la línea de transporte ${Client['Línea de Transporte']} a la(s) ${Client.Hora} del día ${Client.Dia}. Folio de cita: [${Client.Folio}] Agradecemos su preferencia y quedamos a su disposición para cualquier consulta o requerimiento adicional.`;
            const message = `Almacenadora Mercader S.A. le informa que hemos asignado su cita para la línea de transporte ${Client['Línea de Transporte']} a la(s) ${Client.Hora} del día ${Client.Dia} con el folio  [${Client.Folio}]. Agradecemos su preferencia.`;
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
