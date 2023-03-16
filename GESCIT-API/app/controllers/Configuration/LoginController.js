
const LoginDao = require('../../models/Configuration/LoginDao');
const ActiveDirectoryAuthController = require('./ActiveDirectoryAuthController');
const request = require('request');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let data;
    // const data = await ActiveDirectoryAuthController.authVclientes('gecit_p1', 'C0ntrolAccesos/2023');
    try {
      data = await ActiveDirectoryAuthController.authVclientes(username, password);
    } catch (error) {
      console.error(`Error al autenticar usuario con el controlador authVclientes: ${error}`);
      try {
        data = await ActiveDirectoryAuthController.authMercader(username, password);
      } catch (err) {
        console.error(`Error al autenticar usuario con el controlador authMercader: ${err}`);
        return res.status(500).json({ success: false, message: 'Error al realizar el login', info: 'No se pudo autenticar al usuario' });
      }
    }

    if (!data){
      res.status(500).json({ success: false, message: 'Usuario no autorizado ó contraseña incorrecta, favor de intentar de nuevo.'});
    }

    const { cn, sn, mail, memberOf, company } = data.user;

    const Group = /CN=GECIT/;

    if (!Group.test(memberOf)) {
      res.status(500).json({ success: false, message: 'Error al realizar el login.1', info: "No existe en el grupo de GECIT" });
    }

    let userTypeId = 2;
    const response = await registerUser(company, cn, mail, username, userTypeId, password);

    res.json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al realizar el login.2', info: error });
  };
};

const registerUser = async (id, name, mail, userName, userTypeId, password) => {
  return response = await LoginDao.login(id, name, mail, userName, userTypeId, password);
};

const authenticateVClient = async (userName, password) => {
  const url = 'https://portalweb.almer.com.mx/ADConnect/api/authenticateCustomer';
  const data = {
    userName: userName,
    password: password
  };

  console.log(data);

  return new Promise((resolve, reject) => {
    request.post({
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode !== 200) {
        reject(new Error('Error en la solicitud de autenticación'));
      } else {
        resolve(JSON.parse(body));
      };
    });
  });
};

const authenticateMercader = async (userName, password) => {
  const url = 'https://portalweb.almer.com.mx/ADConnect/api/authenticate';
  const data = {
    userName: userName,
    password: password
  };

  console.log(data);

  return new Promise((resolve, reject) => {
    request.post({
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode !== 200) {
        reject(new Error('Error en la solicitud de autenticación'));
      } else {
        resolve(JSON.parse(body));
      };
    });
  });
};

const UserPrivacyNotice = async (req, res) => {
  try {
    const { userId } = req.body;
    const response = await LoginDao.UserPrivacyNotice(userId);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al realizar el proceso.' });
  }
};

const getRoles = async (req, res) => {
  try {
    const categorias = await LoginDao.getRoles();
    res.json(categorias[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los roles.' });
  }
};

const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const userRole = await LoginDao.getUserRole(userId);
    const userCategories = await LoginDao.getUserCategories(userId);
    const userModules = await LoginDao.getUserModules(userId);

    const response = {
      userRol: {
        Id: userRole[0].Id,
        Key: userRole[0].Key,
        Name: userRole[0].Name,
        Description: userRole[0].Description
      },
      userCategories: userCategories,
      userModules: userModules
    };

    res.json(response);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  login: login,
  UserPrivacyNotice: UserPrivacyNotice,
  getRoles: getRoles,
  getUserData: getUserData,
  authenticateMercader: authenticateMercader
};