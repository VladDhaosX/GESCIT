const TransportLineDao = require('../../models/Catalogs/TransportLineDao');

const addOrUpdateTransportLineHandler = async (req, res) => {
    try {
        const { TransportLine } = req.body;
        const result = await TransportLineDao.addOrUpdateTransportLine(TransportLine);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error, message: error.message});
    }
};

const getTransportLinesHandler = async (req, res) => {
	try {
        const { userId } = req.body;
		const transportLines = await TransportLineDao.getTransportLines( userId );
		res.json(transportLines);
	} catch (error) {
		console.error(error);
        res.status(500).json({ error: error, message: error.message});
	}
};

const getTransportLineTypesHandler = async (req, res) => {
	try {
		const transportLines = await TransportLineDao.getTransportLineTypes();
		res.json(transportLines);
	} catch (error) {
		console.error(error);
        res.status(500).json({ error: error, message: error.message});
	}
};

const getTransportLineDocumentsHandler = async (req, res) => {
	try {
		const response = await TransportLineDao.getTransportLineDocuments();
		res.json(response);
	} catch (error) {
		console.error(error);
        res.status(500).json({ error: error, message: error.message});
	}
};

module.exports = {
    addOrUpdateTransportLineHandler,
    getTransportLinesHandler,
    getTransportLineTypesHandler,
    getTransportLineDocumentsHandler
};
