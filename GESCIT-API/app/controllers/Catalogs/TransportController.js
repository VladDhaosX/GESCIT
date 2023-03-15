const TransportDao = require('../../models/Catalogs/TransportDao');

const addOrUpdateTransport = async (req, res) => {
  try {
    const { TransportId, UserId, TransportTypeId, TransportPlate1, TransportPlate2, TransportPlate3, Capacity, StatusId } = req.body;
    const transport = { TransportId, UserId, TransportTypeId, TransportPlate1, TransportPlate2, TransportPlate3, Capacity, StatusId };
    const response = await TransportDao.addOrUpdateTransport(transport);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar o actualizar el transporte.' });
  }
};

const getTransports = async (req, res) => {
  try {
    let { transportId,userId } = req.body;
    transportId = transportId === undefined ? 0 : transportId = transportId;
    userId = userId === undefined ? 0 : userId;
    console.log(transportId, userId);
    const response = await TransportDao.getTransports(transportId,userId);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransportType = async (req, res) => {
  try {
    const response = await TransportDao.getTransportType();
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrUpdateTransport: addOrUpdateTransport,
  getTransports: getTransports,
  getTransportType: getTransportType
};
