const DocumentsDao = require('../../models/Catalogs/DocumentsDao');

module.exports = {

  GetClientsByStatusDocsHandler: async (req, res) => {
    // #swagger.tags = ['Catálogos/Documentos']
    // #swagger.summary = 'Obtener clientes por estatus de documentos.'
    // #swagger.description = 'Endpoint para obtener clientes por estatus de documentos.'
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
    // #swagger.tags = ['Catálogos/Documentos']
    // #swagger.summary = 'Obtener documentos por cliente.'
    // #swagger.description = 'Endpoint para obtener documentos por cliente.'
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
    // #swagger.tags = ['Catálogos/Documentos']
    // #swagger.summary = 'Actualizar estatus de documento.'
    // #swagger.description = 'Endpoint para actualizar estatus de documento.'
    try {
      const { DocumentFileId, NewStatus } = req.body;
      const result = await DocumentsDao.UpdateDocumentStatus(DocumentFileId, NewStatus);
      console.log(result);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

};
