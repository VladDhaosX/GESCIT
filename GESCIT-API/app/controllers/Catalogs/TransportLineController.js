const TransportLineDao = require('../../models/Catalogs/TransportDao');

const addOrUpdateTransportLineHandler = async (req, res) => {
    try {
        const { Id, ClientId, LineName, LineType, StatusId } = req.body;
        const transportLine = { Id, ClientId,LineName, LineType, StatusId };
        const result = await TransportLineDao.addOrUpdateTransportLine(transportLine);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar o actualizar la línea de transporte.' });
    }
};

module.exports = {
    addOrUpdateTransportLineHandler: addOrUpdateTransportLineHandler
};
