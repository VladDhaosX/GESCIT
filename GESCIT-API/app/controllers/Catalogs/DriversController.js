const DriversDao = require('../../models/Catalogs/DriversDao');

module.exports = {
  addOrUpdateDriverHandler: async (req, res) => {
    try {
      const { Driver } = req.body;
      const result = await DriversDao.addOrUpdateDriver(Driver);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar o actualizar el conductor.' });
    }
  },
  GetDriversHandler: async (req, res) => {
    try {
      const { UserId } = req.body;
      const result = await DriversDao.GetDrivers(UserId);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los conductores.' });
    }
  },
  GetDriversDocumentsHandler: async (req, res) => {
    try {
      const result = await DriversDao.GetDriversDocuments();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los conductores.' });
    }
  },
  AddOrUpdateDriverDocumentHandler: async (req, res) => {
    try {
      let { userId, TemporalDocumentId, DocumentId, DriverId } = req.body;
      if (req.file) {
        const { fieldname, originalname, mimetype, size } = req.file;
        const fileContent = req.file.buffer;

        TemporalDocumentId = TemporalDocumentId === 'undefined' ? 0 : TemporalDocumentId;
        TemporalDocumentId = TemporalDocumentId === 'null' ? 0 : TemporalDocumentId;

        const response = await DriversDao.AddOrUpdateDriverDocument(fileContent, userId, TemporalDocumentId, DocumentId, DriverId, fieldname, originalname, mimetype, size);
        res.json(response);
      } else {
        res.json({ success: false, message: "Es necesario asignar un archivo." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error, message: error.message });
    }
  },
  GetDriverDocumentHandler: async (req, res) => {
    const { DocumentFileId } = req.body;
    const response = await DriversDao.GetFileById(DocumentFileId);
    const DocumentBinary = response.DocumentBinary;

    const fileName = "nombre_del_archivo"; // Coloca el nombre y la extensión del archivo aquí

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    res.send(DocumentBinary);
  },
  GetDriverDocumentsHandler: async (req, res) => {
    const { DriverId, TemporalDocumentId } = req.body;
    const response = await DriversDao.GetDriverDocuments(DriverId, TemporalDocumentId);

    res.send(response);
  },
  GetDriverDocumentByIdHandler: async (req, res) => {
    const { DocumentId } = req.body;
    const response = await DriversDao.GetDriverDocumentById(DocumentId);
    res.header('Access-Control-Expose-Headers', '*');
    res.setHeader('Content-Disposition', 'attachment; filename=' + response.data.OriginalName);
    res.type(response.data.Mimetype).send(response.data.FileData);
  },
  DeleteDocumentByIdHandler: async (req, res) => {
    const { DocumentId } = req.body;
    const response = await DriversDao.DeleteDocumentById(DocumentId);
    res.send(response);
  }
};
