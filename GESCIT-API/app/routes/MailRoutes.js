const express = require('express');
const router = express.Router();
const MailController = require('../controllers/Operation/MailController');

router.post('/ReSendSMS',  MailController.ReSendSMSHandler);

router.post('/ReSendMail',  MailController.ReSendMailHandler);

module.exports = router;