const sql = require('mssql');
const config = require('../../config/database');

module.exports = {
    GetRoles: async (Status) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Status', sql.VarChar(sql.MAX), Status)
                .execute('spGetRoles');
            return {
                success: true,
                data: result.recordset
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },
    GetRolId: async (RolId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('RolId', sql.Int, RolId)
                .execute('SpGetRolId');
            return {
                success: true,
                data: result.recordset[0]
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },
    UpdateRol: async (RolId, Key, Name, Description, StatusKey, Permissions, SubPermissions) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('RolId', sql.Int, RolId)
                .input('Key', sql.VarChar(sql.MAX), Key)
                .input('Name', sql.VarChar(sql.MAX), Name)
                .input('Description', sql.VarChar(sql.MAX), Description)
                .input('StatusKey', sql.VarChar(sql.MAX), StatusKey)
                .input('Permissions', sql.VarChar(sql.MAX), Permissions)
                .input('SubPermissions', sql.VarChar(sql.MAX), SubPermissions)
                .output('Success', sql.Bit)
                .output('Message', sql.VarChar(sql.MAX))
                .execute('SpUpdateRol');
            return {
                success: result.output.Success,
                message: result.output.Message
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },
    GetModuleCategoriesByRolId: async (RolId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('RolId', sql.Int, RolId)
                .execute('SpGetModuleCategoriesByRolId');
            return {
                success: true,
                data: result.recordset
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },
    GetRolesActionsPermissionsByRolId: async (RolId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('RolId', sql.Int, RolId)
                .execute('SpGetRolesActionsPermissionsByRolId');
            return {
                success: true,
                data: result.recordset
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },
    GetRolesActionsByUserIdModuleId: async (UserId, ModuleId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('UserId', sql.Int, UserId)
                .input('ModuleId', sql.Int, ModuleId)
                .execute('SpGetRolesActionsByUserIdModuleId');

            return result.recordset;
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },
    GetRolesSubModulesActionsPermissionsByRolId: async (RolId,jsonActionsPermissions) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('RolId', sql.Int, RolId)
                .input('ActionsPermissions', sql.VarChar(sql.MAX), jsonActionsPermissions)
                .execute('SpGetRolesSubModulesActionsPermissionsByRolId');
            return {
                success: true,
                data: result.recordset
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },
    GetSubModulesPermissions: async (UserId, ModuleId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('UserId', sql.Int, UserId)
                .input('ModuleId', sql.Int, ModuleId)
                .execute('SpGetSubModulesPermissions');
            return {
                success: true,
                data: result.recordset
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },
};
