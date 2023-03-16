
const LoginDao = require('../../models/Configuration/LoginDao');
const ActiveDirectoryAuthController = require('./ActiveDirectoryAuthController');

const validateUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const response = await LoginDao.validateUser(username, password);

    if (response.success) return res.json(response)
    else return await AddOrUpdateUser(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al realizar el login.2', info: error });
  };
};

const AddOrUpdateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    let data;

    // const data = await ActiveDirectoryAuthController.authVclientes('gecit_p1', 'C0ntrolAccesos/2023');
    try {
      userTypeId = 2;
      data = await ActiveDirectoryAuthController.authVclientes(username, password);
    } catch (error) {
      console.error(`Error al autenticar usuario con el controlador authVclientes: ${error}`);
      try {
        userTypeId = 1;
        data = await ActiveDirectoryAuthController.authMercader(username, password);
      } catch (err) {
        console.error(`Error al autenticar usuario con el controlador authMercader: ${err}`);
        return res.status(500).json({ success: false, message: 'Error al realizar el login', info: 'No se pudo autenticar al usuario' });
      }
    }

    if (!data) {
      res.status(500).json({ success: false, message: 'Usuario no autorizado ó contraseña incorrecta, favor de intentar de nuevo.' });
    }

    const { cn, sn, mail, memberOf, company } = data.user;

    const Group = /CN=GECIT/;

    if (!Group.test(memberOf)) {
      res.status(500).json({ success: false, message: 'Error al realizar el login.1', info: "No existe en el grupo de GECIT" });
    }

    const response = await LoginDao.AddOrUpdateUser(company, cn, mail, username, userTypeId, password);

    res.json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al realizar el login.2', info: error });
  };
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
    const response = await LoginDao.getRoles();
    return res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al obtener los roles.', info: error });
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
  validateUser,
  AddOrUpdateUser,
  UserPrivacyNotice,
  getRoles,
  getUserData
};