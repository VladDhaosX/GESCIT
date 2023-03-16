const sql = require('mssql');
const config = require('../../config/database');

const GetUserRol = async () => {
    try {
        let pool = await sql.connect(config);
        // Execute stored procedure to login user
        let result = await pool.request()
            .execute('SpGetUserRol');

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
};

const UpdatePermission = async (permissionUserId, RolId) => {
    try {
      let pool = await sql.connect(config);
      let success = false;
      let message = "";
  
      // Execute stored procedure to login user
      let result = await pool.request()
        .input('Permissions_UserId', sql.Int, permissionUserId)
        .input('RolId', sql.Int, RolId)
        .output('success', sql.Bit)
        .output('successMessage', sql.VarChar(100))
        .output('errorMessage', sql.VarChar(100))
        .execute('SpUpdatePermission');
      // Check for success or error message
        success = result.output.success;
        message = result.output.successMessage ? result.output.successMessage : result.output.errorMessage;
  
      return { success, message };
  
    } catch (error) {
      console.error(error);
    }
  };
  
module.exports = {
    GetUserRol,
    UpdatePermission
};
