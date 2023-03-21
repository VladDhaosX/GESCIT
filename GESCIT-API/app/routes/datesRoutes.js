const express = require('express');
const router = express.Router();
const DatesController = require('../controllers/Dates/DatesController');

router.post('/addOrUpdateDates', DatesController.addOrUpdateDate);

router.post('/GetSheduleTimes', DatesController.GetSheduleTimes);

router.post('/GetOperationTypes', DatesController.GetOperationTypes);

router.post('/GetProducts', DatesController.GetProducts);

router.post('/GetTransportLines', DatesController.GetTransportLines);

router.post('/GetTransports', DatesController.GetTransports);

router.post('/GetDrivers', DatesController.GetDrivers);

router.post('/GetDates', DatesController.GetDates);

module.exports = router;