const PresentationDao = require('../../models/Catalogs/PresentationDao');

const GetPresentationHandler = async (req, res) => {
    // #swagger.tags = ['Catálogos']
    const { StatusId } = req.body;
    const result = await PresentationDao.GetPresentation(StatusId);
    res.json(result);
};

module.exports = {
    GetPresentationHandler
};