const express = require('express');
const router = express.Router();
const TransportController = require('../controllers/Catalogs/TransportController');
const TransportLineController = require('../controllers/Catalogs/TransportLineController');
const DriversController = require('../controllers/Catalogs/DriversController');
const multer = require('multer');
const upload = multer({ limits: { fileSize: 1024 * 1024 * 5 } });

// <--- TRANSPORT ROUTES ---> 
router.post('/addOrUpdateTransport', TransportController.addOrUpdateTransport);

router.post('/getTransports', TransportController.getTransports);

router.get('/getTransportType', TransportController.getTransportType);

router.get('/getTransportDocumentType', TransportController.getTransportDocumentType);

// <--- TRANSPORT LINES ROUTES ---> 
router.get('/getTransportLineTypes', TransportLineController.getTransportLineTypesHandler);

router.get('/getTransportLineDocuments', TransportLineController.getTransportLineDocumentsHandler);

router.post('/addOrUpdateTransportLine', TransportLineController.addOrUpdateTransportLineHandler);

router.post('/getTransportLines', TransportLineController.getTransportLinesHandler);

router.post('/AddOrUpdateLineDocument', upload.single('image'), TransportLineController.AddOrUpdateLineDocumentHandler);

router.post('/GetLineDocument',TransportLineController.GetLineDocumentsHandler);

router.post('/GetLineDocumentById',TransportLineController.GetLineDocumentByIdHandler);

router.post('/DeleteDocumentById',TransportLineController.DeleteDocumentByIdHandler);

// <--- DRIVERS ROUTES ---> 
router.post('/addOrUpdateDriver', DriversController.addOrUpdateDriverHandler);

router.post('/GetDrivers', DriversController.GetDriversHandler);

router.get('/GetDriversDocuments', DriversController.GetDriversDocumentsHandler);

router.post('/AddOrUpdateDriverDocument', upload.single('image'), DriversController.AddOrUpdateDriverDocumentHandler);

router.post('/GetDriverDocument',DriversController.GetDriverDocumentsHandler);

router.post('/GetDriverDocumentById',DriversController.GetDriverDocumentByIdHandler);

router.post('/DeleteDocumentById',DriversController.DeleteDocumentByIdHandler);


module.exports = router;