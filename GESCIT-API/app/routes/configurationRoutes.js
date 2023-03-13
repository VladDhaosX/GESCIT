const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/Configuration/LoginController');

router.post('/login', LoginController.login);

router.post('/UserPrivacyNotice', LoginController.UserPrivacyNotice);

router.get('/roles', LoginController.getRoles);

router.post('/getUserData', LoginController.getUserData);

module.exports = router;