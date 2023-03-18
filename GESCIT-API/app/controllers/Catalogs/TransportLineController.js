const TransportLineDao = require('../../models/Catalogs/TransportLineDao');

module.exports = {
	async addOrUpdateTransportLineHandler(req, res) {
		try {
			const { TransportLine } = req.body;
			const result = await TransportLineDao.addOrUpdateTransportLine(TransportLine);
			res.json(result);
		} catch (error) {
			res.status(500).json({ error: error, message: error.message });
		}
	},

	async getTransportLinesHandler(req, res) {
		try {
			const { userId } = req.body;
			const transportLines = await TransportLineDao.getTransportLines(userId);
			res.json(transportLines);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error, message: error.message });
		}
	},

	async getTransportLineTypesHandler(req, res) {
		try {
			const transportLines = await TransportLineDao.getTransportLineTypes();
			res.json(transportLines);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error, message: error.message });
		}
	},

	async getTransportLineDocumentsHandler(req, res) {
		try {
			const response = await TransportLineDao.getTransportLineDocuments();
			res.json(response);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error, message: error.message });
		}
	},

	async AddOrUpdateLineDocumentHandler(req, res) {
		try {
			let { userId, TemporalDocumentId, DocumentId, TransportLineId } = req.body;
			if (req.file) {
				const { fieldname, originalname, mimetype, size } = req.file;
				const fileContent = req.file.buffer;

				TemporalDocumentId = TemporalDocumentId === 'undefined' ? 0 : TemporalDocumentId;
				TemporalDocumentId = TemporalDocumentId === 'null' ? 0 : TemporalDocumentId;

				const response = await TransportLineDao.AddOrUpdateLineDocuments(fileContent, userId, TemporalDocumentId, DocumentId, TransportLineId, fieldname, originalname, mimetype, size);
				console.log(response);
				res.json(response);
			} else {
				res.json({ success: false, message: "Es necesario asignar un archivo." });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error, message: error.message });
		}
	},

	async GetLineDocumentHandler(req, res) {
		const { DocumentFileId } = req.body;
		const response = await TransportLineDao.GetFileById(DocumentFileId);
		const DocumentBinary = response.DocumentBinary;

		const fileName = "nombre_del_archivo"; // Coloca el nombre y la extensión del archivo aquí

		res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
		res.setHeader('Content-Type', 'application/octet-stream');

		res.send(DocumentBinary);
	},

	async GetLineDocumentsHandler(req, res) {
		const { TransportLineId, TemporalDocumentId } = req.body;
		const response = await TransportLineDao.GetLineDocuments(TransportLineId, TemporalDocumentId);

		res.send(response);
	},

	async GetLineDocumentByIdHandler(req, res) {
		const { DocumentId } = req.body;
		const response = await TransportLineDao.GetLineDocumentById(DocumentId);
		res.header('Access-Control-Expose-Headers', '*');
		res.setHeader('Content-Disposition', 'attachment; filename=' + response.data.OriginalName);
		res.type(response.data.Mimetype).send(response.data.FileData);

	},

	async DeleteDocumentByIdHandler(req, res) {
		const { DocumentId } = req.body;
		const response = await TransportLineDao.DeleteDocumentById(DocumentId);
		res.send(response);

	}
};