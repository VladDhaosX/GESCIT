const DriversDao = require('../../models/Catalogs/DriversDao');

module.exports = {
  addOrUpdateDriverHandler: async (req, res) => {
    // #swagger.tags = ['Catálogos/Choferes']
    // #swagger.summary = 'Agregar o actualizar un conductor.'
    // #swagger.description = 'Endpoint para agregar o actualizar un conductor.'
    try {
      const { Driver } = req.body;
      const result = await DriversDao.addOrUpdateDriver(Driver);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar o actualizar el conductor.' });
    }
  },
  GetDriversHandler: async (req, res) => {
    // #swagger.tags = ['Catálogos/Choferes']
    // #swagger.summary = 'Obtener conductores.'
    // #swagger.description = 'Endpoint para obtener conductores.'
    try {
      const { UserId } = req.body;
      const result = await DriversDao.GetDrivers(UserId);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los conductores.' });
    }
  },
};
