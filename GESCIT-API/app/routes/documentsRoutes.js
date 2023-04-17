const express = require('express');
const router = express.Router();
const DocumentsController = require('../controllers/Operation/DocumentsController');
const multer = require('multer');
const upload = multer({ limits: { fileSize: 1024 * 1024 * 5 } });

router.post('/GetDocumentFilesByModuleId', DocumentsController.GetDocumentFilesByModuleIdHandler);

router.post('/AddDocumentFile', upload.single('image'), DocumentsController.AddDocumentFileHandler);

router.post('/GetDocumentsList', DocumentsController.GetDocumentsListHandler);

router.post('/GetDocumentById', DocumentsController.GetDocumentByIdHandler);

router.post('/DeleteDocumentById', DocumentsController.DeleteDocumentByIdHandler);

router.post('/NotDeleteTransportDocuments', DocumentsController.NotDeleteDocuments);

module.exports = router;