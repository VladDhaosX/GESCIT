const DocumentsDao = require('../../models/Catalogs/DocumentsDao');

module.exports = {

  GetClientsByStatusDocsHandler: async (req, res) => {
    try {
      const { Status } = req.body;
      const result = await DocumentsDao.GetClientsByStatusDocs(Status);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
  GetDocumentsByClientHandler: async (req, res) => {
    try {
      const { AccountNum, Status, DocumentType } = req.body;
      const result = await DocumentsDao.GetDocumentsByClient(AccountNum, Status, DocumentType);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
  UpdateDocumentStatusHandler: async (req, res) => {
    try {
      const { DocumentFileId, NewStatus } = req.body;
      const result = await DocumentsDao.UpdateDocumentStatus(DocumentFileId, NewStatus);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

};
