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
};