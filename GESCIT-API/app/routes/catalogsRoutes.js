const express = require('express');
const router = express.Router();
const TransportController = require('../controllers/Catalogs/TransportController');
const TransportLineController = require('../controllers/Catalogs/TransportLineController');
const DriversController = require('../controllers/Catalogs/DriversController');
const DocumentsController = require('../controllers/Catalogs/DocumentsController');
const PresentationController = require('../controllers/Catalogs/PresentationController');

// <--- TRANSPORT ROUTES ---> 
router.post('/addOrUpdateTransport', TransportController.addOrUpdateTransport);

router.post('/getTransports', TransportController.getTransports);

router.get('/getTransportType', TransportController.getTransportType);

// <--- TRANSPORT LINES ROUTES ---> 
router.get('/getTransportLineTypes', TransportLineController.getTransportLineTypesHandler);

router.post('/addOrUpdateTransportLine', TransportLineController.addOrUpdateTransportLineHandler);

router.post('/getTransportLines', TransportLineController.getTransportLinesHandler);

// <--- DRIVERS ROUTES ---> 
router.post('/addOrUpdateDriver', DriversController.addOrUpdateDriverHandler);

router.post('/GetDrivers', DriversController.GetDriversHandler);

// <--- DOCUMENTS ROUTES ---> 
router.post('/GetClientsByStatusDocs', DocumentsController.GetClientsByStatusDocsHandler);

router.post('/GetDocumentsByClient', DocumentsController.GetDocumentsByClientHandler);

router.post('/UpdateDocumentStatus', DocumentsController.UpdateDocumentStatusHandler);

// <--- PRESENTATION ROUTES --->
router.post('/GetPresentation', PresentationController.GetPresentationHandler);

module.exports = router;