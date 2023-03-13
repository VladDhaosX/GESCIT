const DocumentsDao = require('../../models/Catalogs/DocumentsDao');

const addOrUpdateDocumentHandler = async (req, res) => {
    try {
      const { Id, DocumentName, DocumentType } = req.body;
      const document = { Id, DocumentName, DocumentType };
      const result = await DocumentsDao.addOrUpdateDocument(document);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar o actualizar el documento.' });
    }
  };
  
module.exports = {
    addOrUpdateDocumentHandler: addOrUpdateDocumentHandler
};
