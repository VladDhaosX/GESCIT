const TransportDao = require('../../models/Catalogs/TransportDao');

module.exports = {
  addOrUpdateTransport: async (req, res) => {
    try {
      const { Transport } = req.body;
      const response = await TransportDao.addOrUpdateTransport(Transport);
      res.json(response);
    } catch (error) {
      console.error("ControllerError: " + error);
      res.status(500).json({
        success: false,
        message: error.message,
        type: "ControllerError"
      });
    }
  },

  getTransports: async (req, res) => {
    try {
      let { userId } = req.body;
      userId = userId === undefined ? 0 : userId;
      const response = await TransportDao.getTransports(userId);
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTransportType: async (req, res) => {
    try {
      const response = await TransportDao.getTransportType();
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTransportDocumentType: async (req, res) => {
    try {
      const response = await TransportDao.getTransportDocumentType();
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  AddOrUpdateTransportDocumentHandler: async (req, res) => {
    try {
      let { userId, TemporalDocumentId, DocumentId, TransportId } = req.body;
      if (req.file) {
        const { fieldname, originalname, mimetype, size } = req.file;
        const fileContent = req.file.buffer;

        TemporalDocumentId = TemporalDocumentId === 'undefined' ? 0 : TemporalDocumentId;
        TemporalDocumentId = TemporalDocumentId === 'null' ? 0 : TemporalDocumentId;

        const response = await TransportDao.AddOrUpdateTransportDocument(fileContent, userId, TemporalDocumentId, DocumentId, TransportId, fieldname, originalname, mimetype, size);
        res.json(response);
      } else {
        res.json({ success: false, message: "Es necesario asignar un archivo." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error, message: error.message });
    }
  },
  
	async GetTransportDocumentHandler(req, res) {
		const { TransportId, TemporalDocumentId } = req.body;
		const response = await TransportDao.GetTransportDocument(TransportId, TemporalDocumentId);

		res.send(response);
	},

	async GetTransportDocumentByIdHandler(req, res) {
		const { DocumentId } = req.body;
		const response = await TransportDao.GetTransportDocumentById(DocumentId);
		res.header('Access-Control-Expose-Headers', '*');
		res.setHeader('Content-Disposition', 'attachment; filename=' + response.data.OriginalName);
		res.type(response.data.Mimetype).send(response.data.FileData);

	},

	async DeleteDocumentByIdHandler(req, res) {
		const { DocumentId } = req.body;
		const response = await TransportDao.DeleteDocumentById(DocumentId);
		res.send(response);

	}
};
