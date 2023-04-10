
const PermissionsDao = require('../../models/Configuration/PermissionsDao');

module.exports = {
GetUserRol : async (req, res) => {
    // #swagger.tags = ['Configuración']
    try {
        const response = await PermissionsDao.GetUserRol();
        return res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al realizar el login.', info: error });
    };
},

UpdatePermission : async (req, res) => {
    // #swagger.tags = ['Configuración']
    try {
        const { permissionUserId, RolId } = req.body;
        const response = await PermissionsDao.UpdatePermission(permissionUserId, RolId);

        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al realizar la actualización.', info: error.message });
    };
}

};