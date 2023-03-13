const DriversDao = require('../../models/Catalogs/DriversDao');

const addOrUpdateDriverHandler = async (req, res) => {
    try {
      const { Id, ClientId, FirstName, LastName, MiddleName,StatusId } = req.body;
      const driver = { Id, ClientId, FirstName, LastName, MiddleName,StatusId };
      const result = await DriversDao.addOrUpdateDriver(driver);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar o actualizar el chofer.' });
    }
  };

  module.exports = {
    addOrUpdateDriverHandler: addOrUpdateDriverHandler
  };
  