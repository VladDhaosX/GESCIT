const express = require('express');
const router = express.Router();
const TransportController = require('../controllers/Catalogs/TransportController');
const TransportLineController = require('../controllers/Catalogs/TransportLineController');
const DriversController = require('../controllers/Catalogs/DriversController');
const DocumentsController = require('../controllers/Catalogs/DocumentsController');
const TransportLineDao = require('../models/Catalogs/TransportLineDao');

// <--- TRANSPORT ROUTES ---> 
router.post('/addOrUpdateTransport', TransportController.addOrUpdateTransport);

router.post('/getTransports', TransportController.getTransports);

router.get('/getTransportType', TransportController.getTransportType);

// <--- TRANSPORT LINES ROUTES ---> 
router.post('/addOrUpdateTransportLine', TransportLineController.addOrUpdateTransportLineHandler);

router.post('/getTransportLines', TransportLineController.getTransportLinesHandler);

router.get('/getTransportLineTypes', TransportLineController.getTransportLineTypesHandler);

router.get('/getTransportLineDocuments', TransportLineController.getTransportLineDocumentsHandler);

// router.post('/addOrUpdateLineDocument', TransportLineController.AddOrUpdateLineDocument);

// <--- DRIVERS ROUTES ---> 
router.post('/addOrUpdateDriver', DriversController.addOrUpdateDriverHandler);

router.get('/GetDrivers', DriversController.GetDrivers);

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// <--- DOCUMENTS ROUTES ---> 
router.post('/addOrUpdateLineDocument', upload.single('LineDocumentFile'), async (req, res) => {
    try {
        console.log(req.file);
        // const { userId, TransportLineId } = req.body;
        // const LineDocumentFile = req.files['LineDocumentFile'].buffer.toString('base64');

        // const response = await TransportLineDao.AddOrUpdateLineDocuments(userId, TransportLineId, LineDocumentFile);
        // console.log(LineDocumentFile);
        res.json('1');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error, message: error.message });
    }
});

module.exports = router;