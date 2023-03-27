const express = require('express');
const router = express.Router();
const DatesController = require('../controllers/DatesController');

router.post('/addOrUpdateDates', DatesController.addOrUpdateDate);

router.post('/GetSheduleTimes', DatesController.GetSheduleTimes);

router.post('/GetOperationTypes', DatesController.GetOperationTypes);

router.post('/GetProducts', DatesController.GetProducts);

router.post('/GetTransportLines', DatesController.GetTransportLines);

router.post('/GetTransports', DatesController.GetTransports);

router.post('/GetTransports', DatesController.GetTransports);

router.post('/GetDrivers', DatesController.GetDrivers);

router.post('/GetDates', DatesController.GetDates);

router.get('/GetTransportType', DatesController.GetTransportTypes);

router.post('/GetTransportsByType', DatesController.GetTransportsByType);

router.post('/IsAppointmentTimeAvailable', DatesController.IsAppointmentTimeAvailableHandler);

module.exports = router;