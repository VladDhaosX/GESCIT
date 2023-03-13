const TransportLineDao = require('../../models/Catalogs/TransportLineDao');

const addOrUpdateTransportLineHandler = async (req, res) => {
    try {
        const { TransportLineId, UserId, NameLine, TransportLineTypeId, StatusId } = req.body;
        const transportLine = { TransportLineId, UserId, NameLine, TransportLineTypeId, StatusId };
        const result = await TransportLineDao.addOrUpdateTransportLine(transportLine);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar o actualizar la línea de transporte.' });
    }
};

const getTransportLinesHandler = async (req, res) => {
	try {
        const { TransportLineId, UserId } = req.body;
		const transportLines = await TransportLineDao.getTransportLines(TransportLineId, UserId );
		res.json(transportLines);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error al obtener las líneas de transporte.' });
	}
};

module.exports = {
    addOrUpdateTransportLineHandler: addOrUpdateTransportLineHandler,
    getTransportLinesHandler: getTransportLinesHandler
};
