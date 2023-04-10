const request = require('request');
const group = 'GECIT';

module.exports = {
  authMercader: async (username, password) => {
    // #swagger.tags = ['Configuración']
    const options = {
      url: 'https://portalweb.almer.com.mx/ADConnectDev/api/authenticate',
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
    // #swagger.tags = ['Configuración']
    const options = {
      url: 'https://portalweb.almer.com.mx/ADConnectDev/api/authenticateVClientes',
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

  changePasswordClient: async (username, NewPassword, OldPassword) => {
    // #swagger.tags = ['Configuración']
    const options = {
      url: 'https://portalweb.almer.com.mx/ADConnectDev/api/changePasswordClientesPC',
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
  },

  isMemberOfVClientesGroup: async (username) => {
    // #swagger.tags = ['Configuración']
    const options = {
      url: 'https://portalweb.almer.com.mx/ADConnectDev/api/isMemberOfVClientesGroup',
      method: 'POST',
      json: true,
      body: {
        userName: username,
        group: group
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

  isMemberOfMercaderGroup: async (username) => {
    // #swagger.tags = ['Configuración']
    const options = {
      url: 'https://portalweb.almer.com.mx/ADConnectDev/api/isMemberOfMercaderGroup',
      method: 'POST',
      json: true,
      body: {
        userName: username,
        group: group
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
};
