const request = require('request');

module.exports = {
  authMercader: async (username, password) => {
    const options = {
      url: 'https://portalweb.almer.com.mx/ADConnect/api/authenticate',
      method: 'POST',
      json: true,
      body: {
        userName: username,
        password: password
      }
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
  },
  authVCliente: async (username, password) => {
    const options = {
      url: 'https://portalweb.almer.com.mx/ADConnect/api/authenticateCustomer',
      method: 'POST',
      json: true,
      body: {
        userName: username,
        password: password
      }
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
  },
  changePasswordClient: async (username, NewPassword,OldPassword) => {
    const options = {
      url: 'https://portalweb.almer.com.mx/ADConnect/api/changePasswordClientesPC',
      method: 'POST',
      json: true,
      body: {
        userName: username,
        oldPassword: OldPassword,
        newPassword: NewPassword
      }
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
