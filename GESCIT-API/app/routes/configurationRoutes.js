const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/Configuration/LoginController');
const PermissionsController = require('../controllers/Configuration/PermissionsController');

router.post('/login', LoginController.validateUser);

router.post('/UserPrivacyNotice', LoginController.UserPrivacyNotice);

router.get('/GetRoles', LoginController.getRoles);

router.post('/getUserData', LoginController.getUserData);

router.get('/getPermissions', PermissionsController.GetUserRol);

router.post('/UpdatePermission', PermissionsController.UpdatePermission);

module.exports = router;