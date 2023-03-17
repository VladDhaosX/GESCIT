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

// <--- DRIVERS ROUTES ---> 
router.post('/addOrUpdateDriver', DriversController.addOrUpdateDriverHandler);

router.get('/GetDrivers', DriversController.GetDrivers);

const multer = require('multer');
const upload = multer({ limits: { fileSize: 1024 * 1024 * 5 } });

router.post('/upload', upload.single('image'), async (req, res, next) => {
    // Maneja la imagen recibida
    console.log(req.file);

    // Obtén el contenido del archivo directamente del búfer
    const fileData = req.file.buffer;

    // Guarda el archivo en la base de datos usando tu función de DAO de SQL
    const response = await TransportLineDao.AddOrUpdateLineDocuments(fileData);
    console.log(response);
});

router.get('/download', async function(req, res) {
    const response = await TransportLineDao.GetFileById(1);
    const DocumentBinary = response.DocumentBinary;
    
    const fileName = "nombre_del_archivo"; // Coloca el nombre y la extensión del archivo aquí
    
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    
    res.send(DocumentBinary);
  });

module.exports = router;