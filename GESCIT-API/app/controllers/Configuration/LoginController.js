
const LoginDao = require('../../models/Configuration/LoginDao');
const ADController = require('./ActiveDirectoryAuthController');
const MailController = require('./MailController');
const CryptoController = require('./CryptoController');
const RolesDao = require('../../models/Configuration/RolesDao');

module.exports = {
  async validateUser(req, res) {
    // #swagger.tags = ['Configuración/Usuario']
    try {
      const { username, password } = req.body;

      const isMemberOfVClientesGroup = await ADController.isMemberOfVClientesGroup(username);
      if (isMemberOfVClientesGroup.success) {
        const ADresponse = await ADController.authVCliente(username, password);
        if (ADresponse.success) {
          const { name, mail, userName, company } = ADresponse.data;
          const response = await LoginDao.AddOrUpdateUser(company, name, mail, userName, 2, password);
          if (response) {
            res.json(response);
          } else {
            res.json({ success: response.success, message: response.message });
          };
        } else {
          res.json({ success: ADresponse.success, message: ADresponse.message });
        };
      } else {
        const isMemberOfMercaderGroup = await ADController.isMemberOfMercaderGroup(username);
        if (isMemberOfMercaderGroup.success) {
          const ADresponse = await ADController.authMercader(username, password);
          if (ADresponse.success) {
            const { name, mail, userName, company } = ADresponse.data;
            const response = await LoginDao.AddOrUpdateUser(company, name, mail, userName, 1, password);
            if (response) {
              res.json(response);
            } else {
              res.json({ success: response.success, message: response.message });
            };
          } else {
            res.json({ success: ADresponse.success, message: ADresponse.message });
          };
        } else {
          res.json({ success: isMemberOfMercaderGroup.success, message: isMemberOfMercaderGroup.message });
        };
      };

      // let ADresponse = await ADController.authVCliente(username, password);
      // if (ADresponse.success) {
      //   let { id, name, mail, userName, company } = ADresponse.data;
      //   const response = await LoginDao.AddOrUpdateUser(company, name, mail, userName, 2, password);
      //   if (response) {
      //     res.json(response);
      //   } else {
      //     res.json({ success: response.success, message: response.message });
      //   };
      // }
      // else {
      //   ADresponse = await ADController.authMercader(username, password);
      //   if (ADresponse.success) {
      //     let { id, name, mail, userName, company } = ADresponse.data;
      //     const response = await LoginDao.AddOrUpdateUser(company, name, mail, userName, 1, password);
      //     if (response) {
      //       res.json(response);
      //     } else {
      //       res.json({ success: response.success, message: response.message });
      //     };
      //   } else {
      //     res.json({ success: ADresponse.success, message: ADresponse.message });
      //   };
      // };
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al realizar el login.', info: error.message });
    };
  },

  UserPrivacyNoticeHandler: async (req, res) => {
    // #swagger.tags = ['Configuración/Usuario']
    try {
      const { userId } = req.body;
      const response = await LoginDao.UserPrivacyNotice(userId);
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al realizar el proceso.', info: error.message });
    }
  },

  getRoles: async (req, res) => {
    // #swagger.tags = ['Configuración']
    try {
      const response = await LoginDao.getRoles();
      return res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error al obtener los roles.', info: error });
    }
  },

  getUserData: async (req, res) => {
    // #swagger.tags = ['Configuración/Usuario']
    try {
      const { userId, ModuleId } = req.body;
      const userRole = await LoginDao.getUserRole(userId);
      const userCategories = await LoginDao.getUserCategories(userId);
      const userModules = await LoginDao.getUserModules(userId);
      const userData = await LoginDao.getUserData(userId);
      const userPermissions = await RolesDao.GetRolesActionsByUserIdModuleId(userId, ModuleId);

      const response = {
        userRol: {
          Id: userRole[0].Id,
          Key: userRole[0].Key,
          Name: userRole[0].Name,
          Description: userRole[0].Description
        },
        userCategories: userCategories,
        userModules: userModules,
        userData: userData,
        userPermissions: userPermissions
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al realizar el proceso.', info: error.message });
    }
  },

  ResetPassowrdHandler: async (req, res) => {
    // #swagger.tags = ['Configuración/Usuario']
    try {
      const { userResetPassword, emailResetPassword } = req.body;
      const MailExists = await LoginDao.ValidateUserEmail(userResetPassword, emailResetPassword);

      if (MailExists) {
        const token = await CryptoController.generateToken();
        const insertTokenResponse = await LoginDao.insertPasswordResetToken(userResetPassword, emailResetPassword, token);
        if (insertTokenResponse.success) {
          const mailResponse = await MailController.SendResetPassowordEmail(userResetPassword, emailResetPassword, token);
          if (mailResponse.success) {
            res.json({ success: false, message: 'El correo no existe.' });
          };
          res.json({ success: true, message: 'Se ha enviado un correo de recuperacion de contraseña.' });

        }
      } else {
        res.json({ success: false, message: 'El correo no existe.' });
      };
    } catch (error) {
      res.status(500).json({ message: 'Error al realizar el proceso.', info: error.message });
    }
  },

  ChangePasswordHandler: async (req, res) => {
    // #swagger.tags = ['Configuración/Usuario']
    try {
      const { token, user, email, NewPassword, ConfirmedNewPassword } = req.body;
      let response = await LoginDao.ValidateChangePassword(user, email, token, NewPassword, ConfirmedNewPassword);
      if (response.success) {
        const OldPassword = response.OldPassword;
        const ADresponse = await ADController.changePasswordClient(user, NewPassword, OldPassword);
        if (ADresponse.success) {
          response = await LoginDao.UpdateNewPassword(user, email, token, NewPassword);
          res.json({ success: true, message: response.message });
        } else {
          res.json({ success: false, message: ADresponse.message });
        }
      } else {
        res.json({ success: false, message: response.message });
      };

      // res.json(response);
    } catch (error) {
      res.status(500).json({ message: 'Error al realizar el proceso.', info: error.message });
    }
  },

};