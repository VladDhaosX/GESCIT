const TransportDao = require('../../models/Catalogs/TransportDao');

module.exports = {
  addOrUpdateTransport: async (req, res) => {
    // #swagger.tags = ['Catálogos/Transportes']
    // #swagger.summary = 'Agregar o actualizar un transporte.'
    // #swagger.description = 'Endpoint para agregar o actualizar un transporte.'
    try {
      const { Transport } = req.body;
      const response = await TransportDao.addOrUpdateTransport(Transport);
      res.json(response);
    } catch (error) {
      console.error("ControllerError: " + error);
      res.status(500).json({
        success: false,
        message: error.message,
        type: "ControllerError"
      });
    }
  },

  getTransports: async (req, res) => {
    // #swagger.tags = ['Catálogos/Transportes']
    // #swagger.summary = 'Obtener transportes.'
    // #swagger.description = 'Endpoint para obtener transportes.'
    try {
      let { userId } = req.body;
      userId = userId === undefined ? 0 : userId;
      const response = await TransportDao.getTransports(userId);
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTransportType: async (req, res) => {
    // #swagger.tags = ['Catálogos/Transportes']
    // #swagger.summary = 'Obtener tipos de transporte.'
    // #swagger.description = 'Endpoint para obtener tipos de transporte.'
    try {
      const response = await TransportDao.getTransportType();
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

};