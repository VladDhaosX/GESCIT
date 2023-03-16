
const PermissionsDao = require('../../models/Configuration/PermissionsDao');

const GetUserRol = async (req, res) => {
    try {
        const response = await PermissionsDao.GetUserRol();
        return res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al realizar el login.2', info: error });
    };
};

const UpdatePermission = async (req, res) => {
    try {

        const { permissionUserId, RolId } = req.body;
        const response = await PermissionsDao.UpdatePermission(permissionUserId, RolId);

        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al realizar la actualizacion.', info: error.message });
    };
};

module.exports = {
    GetUserRol,
    UpdatePermission
};