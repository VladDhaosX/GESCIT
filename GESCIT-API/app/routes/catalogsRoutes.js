const express = require('express');
const router = express.Router();
const TransportController = require('../controllers/Catalogs/TransportController');
const TransportLineController = require('../controllers/Catalogs/TransportLineController');
const DriversController = require('../controllers/Catalogs/DriversController');

// <--- TRANSPORT ROUTES ---> 
router.post('/addOrUpdateTransport', TransportController.addOrUpdateTransport);

router.post('/getTransports', TransportController.getTransports);

router.get('/getTransportType', TransportController.getTransportType);

// <--- TRANSPORT LINES ROUTES ---> 
router.get('/getTransportLineTypes', TransportLineController.getTransportLineTypesHandler);

router.get('/getTransportLineDocuments', TransportLineController.getTransportLineDocumentsHandler);

router.post('/addOrUpdateTransportLine', TransportLineController.addOrUpdateTransportLineHandler);

router.post('/getTransportLines', TransportLineController.getTransportLinesHandler);

// <--- DRIVERS ROUTES ---> 
router.post('/addOrUpdateDriver', DriversController.addOrUpdateDriverHandler);

router.post('/GetDrivers', DriversController.GetDriversHandler);

module.exports = router;