
const LoginDao = require('../../models/Configuration/LoginDao');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await LoginDao.login(username, password);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al realizar el login.' });
  }
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
    
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(response);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  login: login,
  UserPrivacyNotice: UserPrivacyNotice,
  getRoles: getRoles,
  getUserData: getUserData
};