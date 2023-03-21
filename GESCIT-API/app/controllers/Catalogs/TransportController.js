const TransportDao = require('../../models/Catalogs/TransportDao');

const addOrUpdateTransport = async (req, res) => {
  try {
    const { Transport } = req.body;
    const response = await TransportDao.addOrUpdateTransport(Transport);
    res.json(response);
  } catch (error) {
    console.error("ControllerError: " + error);
    res.status(500).json({ 
      success: false,
      message: error.message,
      type: "ControllerError" });
  }
};

const getTransports = async (req, res) => {
  try {
    let { transportId,userId } = req.body;
    transportId = transportId === undefined ? 0 : transportId = transportId;
    userId = userId === undefined ? 0 : userId;
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
