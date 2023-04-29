const RolesDao = require('../../models/Configuration/RolesDao');

module.exports = {
    getRoles: async (req, res) => {
        // #swagger.tags = ['Configuración']
        const { Status } = req.body;
        const result = await RolesDao.GetRoles(Status);
        res.json(result);
    },
    getRolId: async (req, res) => {
        // #swagger.tags = ['Configuración']
        const { RolId } = req.body;
        const result = await RolesDao.GetRolId(RolId);
        res.json(result);
    },
    updateRol: async (req, res) => {
        // #swagger.tags = ['Configuración']
        const { RolId, Key, Name, Description, StatusKey, Permissions } = req.body;
        const result = await RolesDao.UpdateRol(RolId, Key, Name, Description, StatusKey, Permissions);
        res.json(result);
    },
    //GetModuleCategoriesByRolId: async (RolId) => {
    getModuleCategoriesByRolId: async (req, res) => {
        // #swagger.tags = ['Configuración']
        const { RolId } = req.body;
        const result = await RolesDao.GetModuleCategoriesByRolId(RolId);
        res.json(result);
    },
    getRolesActionsPermissionsByRolId: async (req, res) => {
        // #swagger.tags = ['Configuración']
        const { RolId } = req.body;
        const result = await RolesDao.GetRolesActionsPermissionsByRolId(RolId);
        res.json(result);
    },
    getRolesActionsByUserIdModuleId: async (req, res) => {
        // #swagger.tags = ['Configuración']
        const { UserId, ModuleId } = req.body;
        const result = await RolesDao.GetRolesActionsByUserIdModuleId(UserId, ModuleId);
        res.json(result);
    },
};