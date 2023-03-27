const DriversDao = require('../../models/Catalogs/DriversDao');

module.exports = {
  addOrUpdateDriverHandler: async (req, res) => {
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
