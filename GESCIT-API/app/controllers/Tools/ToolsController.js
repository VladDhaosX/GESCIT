const ToolsDao = require('../../models/Tools/ToolsDao');

module.exports = {
    GetAllSchedulesAvailables: async (req, res) => {
        try {
            const { date } = req.body;
            const result = await ToolsDao.GetAllSchedulesAvailables(date);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los horarios disponibles.' });
        }
    },
};