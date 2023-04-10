const ToolsDao = require('../../models/Tools/ToolsDao');

module.exports = {
    GetAllSchedulesAvailable: async (req, res) => {
        // #swagger.tags = ['Herramientas']
        try {
            const { date } = req.body;
            const result = await ToolsDao.GetAllSchedulesAvailable(date);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los horarios disponibles.' });
        }
    },
};