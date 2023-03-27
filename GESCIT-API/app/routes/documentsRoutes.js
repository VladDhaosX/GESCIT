const express = require('express');
const router = express.Router();
const DocumentsController = require('../controllers/DocumentsController');
const multer = require('multer');
const upload = multer({ limits: { fileSize: 1024 * 1024 * 5 } });

// <--- TRANSPORT LINES ROUTES ---> 
router.post('/AddOrUpdateLineDocument', upload.single('image'), DocumentsController.AddOrUpdateLineDocumentHandler);

// <--- DRIVERS ROUTES ---> 
router.post('/AddOrUpdateDriverDocument', upload.single('image'), DocumentsController.AddOrUpdateDriverDocumentHandler);

router.post('/GetDocumentFilesByModuleId', DocumentsController.GetDocumentFilesByModuleIdHandler);

router.post('/AddDocumentFile', upload.single('image'), DocumentsController.AddDocumentFileHandler);

router.post('/GetDocumentsList', DocumentsController.GetDocumentsListHandler);

router.post('/GetDocumentById', DocumentsController.GetDocumentByIdHandler);

router.post('/DeleteDocumentById', DocumentsController.DeleteDocumentByIdHandler);

router.post('/NotDeleteTransportDocuments',DocumentsController.NotDeleteDocuments);

module.exports = router;