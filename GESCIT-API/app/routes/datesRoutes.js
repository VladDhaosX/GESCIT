const express = require('express');
const router = express.Router();
const DatesController = require('../controllers/Dates/DatesController');

router.post('/addOrUpdateAppointment', DatesController.addOrUpdateAppointmentHandler);

module.exports = router;