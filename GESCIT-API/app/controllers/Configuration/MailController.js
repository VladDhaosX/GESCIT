const request = require('request');

module.exports = {
  SendResetPassowordEmail: async (user,email,token) => {
    const body = {
      recipientsList: [
        email
      ],
      subject: 'Gecit - Gestor de Citas | Restablece tu contraseña',
      body: `Se ha solicitado un restablecimiento de contraseña, si no ha sido usted, favor de ignorar este correo. De lo contrario, favor de dar click en el siguiente enlace: http://localhost:3000/login?token=${token}&user=${user}&email=${email}`,
      isBodyHtml: false
    };

    const options = {
      url: 'https://portalesdemo.almer.com.mx/AlmerNotificationsApi/Email/SendMailNotification',
      method: 'POST',
      json: true,
      body: body
    };

    return new Promise((resolve, reject) => {
      request(options, function (err, res, body) {
        if (err) {
          return reject(err);
        }

        if (res.statusCode !== 200) {
          return reject(new Error(`La autenticación falló con el código de estado: ${res.statusCode}`));
        }

        return resolve(body);
      });
    });
  }
};