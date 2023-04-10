const DocumentsDao = require('../../models/Operation/DocumentsDao');

module.exports = {
    // <--- TRANSPORT LINES ROUTES ---> 
    AddOrUpdateLineDocumentHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        try {
            let { userId, TemporalDocumentId, DocumentId, TransportLineId } = req.body;
            if (req.file) {
                const { fieldname, originalname, mimetype, size } = req.file;
                const fileContent = req.file.buffer;

                TemporalDocumentId = TemporalDocumentId === 'undefined' ? 0 : TemporalDocumentId;
                TemporalDocumentId = TemporalDocumentId === 'null' ? 0 : TemporalDocumentId;

                const response = await DocumentsDao.AddOrUpdateLineDocuments(fileContent, userId, TemporalDocumentId, DocumentId, TransportLineId, fieldname, originalname, mimetype, size);
                res.json(response);
            } else {
                res.json({ success: false, message: "Es necesario asignar un archivo." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error, message: error.message });
        }
    },

    // <--- DRIVERS ROUTES ---> 
    AddOrUpdateDriverDocumentHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        try {
            let { userId, TemporalDocumentId, DocumentId, DriverId } = req.body;
            if (req.file) {
                const { fieldname, originalname, mimetype, size } = req.file;
                const fileContent = req.file.buffer;

                TemporalDocumentId = TemporalDocumentId === 'undefined' ? 0 : TemporalDocumentId;
                TemporalDocumentId = TemporalDocumentId === 'null' ? 0 : TemporalDocumentId;

                const response = await DocumentsDao.AddOrUpdateDriverDocument(fileContent, userId, TemporalDocumentId, DocumentId, DriverId, fieldname, originalname, mimetype, size);
                res.json(response);
            } else {
                res.json({ success: false, message: "Es necesario asignar un archivo." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error, message: error.message });
        }
    },

    //AddDocumentFileHandler
    AddDocumentFileHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        try {
            let { userId, TemporalDocumentId, DocumentId, ModuleId } = req.body;
            if (req.file) {
                const { fieldname, originalname, mimetype, size } = req.file;
                const fileContent = req.file.buffer;

                TemporalDocumentId = TemporalDocumentId === 'undefined' ? 0 : TemporalDocumentId;
                TemporalDocumentId = TemporalDocumentId === 'null' ? 0 : TemporalDocumentId;

                const response = await DocumentsDao.AddDocumentFile(fileContent, userId, TemporalDocumentId, DocumentId, ModuleId, fieldname, originalname, mimetype, size);
                res.json(response);
            } else {
                res.json({ success: false, message: "Es necesario asignar un archivo." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error, message: error.message });
        }
    },

    GetDocumentFilesByModuleIdHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        const { DocumentType, ModuleId, TemporalDocumentId } = req.body;
        const response = await DocumentsDao.GetDocumentFilesByModuleId(DocumentType, ModuleId, TemporalDocumentId);
        res.send(response);
    },

    GetDocumentsListHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        const { DocumentType } = req.body;
        const response = await DocumentsDao.GetDocumentsList(DocumentType);
        res.send(response);
    },

    GetDocumentByIdHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        const { DocumentId } = req.body;
        const response = await DocumentsDao.GetDocumentById(DocumentId);
        res.header('Access-Control-Expose-Headers', '*');
        res.setHeader('Content-Disposition', 'attachment; filename=' + response.data.OriginalName);
        res.type(response.data.Mimetype).send(response.data.FileData);
    },

    DeleteDocumentByIdHandler: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        const { DocumentId } = req.body;
        const response = await DocumentsDao.DeleteDocumentById(DocumentId);
        res.send(response);
    },

    NotDeleteDocuments: async (req, res) => {
        // #swagger.tags = ['Operaciones']
        const { ModuleId, DocumentType } = req.body;
        const response = await DocumentsDao.NotDeleteDocuments(ModuleId, DocumentType);
        res.send(response);
    }
};