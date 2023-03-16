const TransportLineDao = require('../../models/Catalogs/TransportLineDao');

const addOrUpdateTransportLineHandler = async (req, res) => {
    try {
        const { TransportLineId, UserId, Name, LineTypeId, StatusId } = req.body;
        const transportLine = { TransportLineId, UserId, Name, LineTypeId, StatusId };
        const result = await TransportLineDao.addOrUpdateTransportLine(transportLine);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error, message: error.message});
    }
};

const getTransportLinesHandler = async (req, res) => {
	try {
        const { UserId } = req.body;
		const transportLines = await TransportLineDao.getTransportLines( UserId );
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
