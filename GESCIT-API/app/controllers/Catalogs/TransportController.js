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

  
module.exports = {
    addOrUpdateTransport: addOrUpdateTransport
  };
  