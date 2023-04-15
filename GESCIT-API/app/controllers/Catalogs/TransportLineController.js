const TransportLineDao = require('../../models/Catalogs/TransportLineDao');

module.exports = {
	async addOrUpdateTransportLineHandler(req, res) {
		// #swagger.tags = ['Catálogos/Lineas de Transporte']
		// #swagger.summary = 'Agregar o actualizar una linea de transporte.'
		// #swagger.description = 'Endpoint para agregar o actualizar una linea de transporte.'
		try {
			const { TransportLine } = req.body;
			const result = await TransportLineDao.addOrUpdateTransportLine(TransportLine);
			res.json(result);
		} catch (error) {
			res.status(500).json({ error: error, message: error.message });
		}
	},

	async getTransportLinesHandler(req, res) {
		// #swagger.tags = ['Catálogos/Lineas de Transporte']
		// #swagger.summary = 'Obtener lineas de transporte.'
		// #swagger.description = 'Endpoint para obtener lineas de transporte.'
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
		// #swagger.tags = ['Catálogos/Lineas de Transporte']
		// #swagger.summary = 'Obtener tipos de linea de transporte.'
		// #swagger.description = 'Endpoint para obtener tipos de linea de transporte.'
		try {
			const transportLines = await TransportLineDao.getTransportLineTypes();
			res.json(transportLines);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error, message: error.message });
		}
	},
};