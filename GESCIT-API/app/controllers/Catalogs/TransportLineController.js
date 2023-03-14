const TransportLineDao = require('../../models/Catalogs/TransportLineDao');

const addOrUpdateTransportLineHandler = async (req, res) => {
    try {
        const { TransportLineId, UserId, NameLine, TransportLineTypeId, StatusId } = req.body;
        const transportLine = { TransportLineId, UserId, NameLine, TransportLineTypeId, StatusId };
        const result = await TransportLineDao.addOrUpdateTransportLine(transportLine);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error, message: error.message});
    }
};

const getTransportLinesHandler = async (req, res) => {
	try {
        const { TransportLineId, UserId } = req.body;
		const transportLines = await TransportLineDao.getTransportLines(TransportLineId, UserId );
		res.json(transportLines);
	} catch (error) {
		console.error(error);
        res.status(500).json({ error: error, message: error.message});
	}
};

module.exports = {
    addOrUpdateTransportLineHandler: addOrUpdateTransportLineHandler,
    getTransportLinesHandler: getTransportLinesHandler
};
