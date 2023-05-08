const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/Configuration/LoginController');
const PermissionsController = require('../controllers/Configuration/PermissionsController');
const RolesController = require('../controllers/Configuration/RolesController');

router.post('/login', LoginController.validateUser);

router.post('/ResetPassowrd', LoginController.ResetPassowrdHandler);

router.post('/ChangePassword', LoginController.ChangePasswordHandler);

router.post('/UserPrivacyNotice', LoginController.UserPrivacyNoticeHandler);

router.get('/GetRoles', LoginController.getRoles);

router.post('/getUserData', LoginController.getUserData);

router.get('/getPermissions', PermissionsController.GetUserRol);

router.post('/UpdatePermission', PermissionsController.UpdatePermission);

router.post('/GetRoles', RolesController.getRoles);

router.post('/GetRolId', RolesController.getRolId);

router.post('/UpdateRol', RolesController.updateRol);

router.post('/GetModuleCategoriesByRolId', RolesController.getModuleCategoriesByRolId);

router.post('/GetRolesActionsPermissionsByRolId', RolesController.getRolesActionsPermissionsByRolId);

router.post('/GetRolesActionsByUserIdModuleId', RolesController.getRolesActionsByUserIdModuleId);

router.post('/GetRolesSubModulesActionsPermissionsByRolId', RolesController.getRolesSubModulesActionsPermissionsByRolId);

router.post('/GetSubModulesPermissions', RolesController.getSubModulesPermissions);

module.exports = router;