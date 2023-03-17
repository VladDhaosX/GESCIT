const DriversDao = require('../../models/Catalogs/DriversDao');

const addOrUpdateDriverHandler = async (req, res) => {
    try {
      const { DriverId, UserId , FirstName, LastName, MiddleName, Phone } = req.body;
      const driver = { DriverId, FirstName, LastName, MiddleName, Phone };
      console.log(driver);
      const result = await DriversDao.addOrUpdateDriver(driver);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar o actualizar el chofer.' });
    }
  };

const GetDrivers = async (req, res) => {
    try {
      const result = await DriversDao.GetDrivers();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar o actualizar el chofer.' });
    }
  };

  module.exports = {
    addOrUpdateDriverHandler,
    GetDrivers
  };
  