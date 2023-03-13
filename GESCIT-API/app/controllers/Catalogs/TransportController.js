const TransportDao = require('../../models/Catalogs/TransportDao');

const addOrUpdateTransport = async (req, res) => {
    try {
      const { TransportId, ClientId, TransportType, TransportPlate, TransportPlate2, TransportPlate3, Capacity, StatusId } = req.body;
      const transport = { TransportId, ClientId, TransportType, TransportPlate, TransportPlate2, TransportPlate3, Capacity, StatusId };
      const response = await TransportDao.addOrUpdateTransport(transport);
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar o actualizar el transporte.' });
    }
  };

  const getTransports = async (req, res) => {
    try {
      const { TransportId } = req.body;
      const response = await TransportDao.getTransports(TransportId);
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al consultar transportes.' });
    }
  };

  
module.exports = {
    addOrUpdateTransport: addOrUpdateTransport,
    getTransports: getTransports
  };
  