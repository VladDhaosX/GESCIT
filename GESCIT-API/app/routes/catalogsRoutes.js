const express = require('express');
const router = express.Router();
const TransportController = require('../controllers/Catalogs/TransportController');
const TransportLineController = require('../controllers/Catalogs/TransportLineController');
const DriversController = require('../controllers/Catalogs/DriversController');
const DocumentsController = require('../controllers/Catalogs/DocumentsController');

// <--- TRANSPORT ROUTES ---> 
router.post('/addOrUpdateTransport', TransportController.addOrUpdateTransport);

// <--- TRANSPORT LINES ROUTES ---> 
router.post('/addOrUpdateTransportLine', TransportLineController.addOrUpdateTransportLineHandler);

// <--- DRIVERS ROUTES ---> 
router.post('/addOrUpdateDriver', DriversController.addOrUpdateDriverHandler);

// <--- DOCUMENTS ROUTES ---> 
router.post('/addOrUpdateDocument', DriversController.addOrUpdateDocumentHandler);

module.exports = router;