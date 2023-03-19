const sql = require("mssql");
const config = require("../../config/database");

module.exports = {
  AddOrUpdateUser: async (AccountNum, name, mail, userName, userTypeId, password) => {
    try {
      let pool = await sql.connect(config);
      let Id = 0;
      let success = false;
      let PrivacyNotice = 0;
      let message = "";

      // Execute stored procedure to login user
      let result = await pool
        .request()
        .input("AccountNum", sql.VarChar(50), AccountNum)
        .input("name", sql.VarChar(50), name)
        .input("mail", sql.VarChar(50), mail)
        .input("userName", sql.VarChar(50), userName)
        .input("userTypeId", sql.Int, userTypeId)
        .input("password", sql.VarChar(50), password)
        .output("success", sql.Bit)
        .output("Id", sql.Int)
        .output("PrivacyNotice", sql.Int)
        .output("successMessage", sql.VarChar(100))
        .output("errorMessage", sql.VarChar(100))
        .execute("SpAddOrUpdateUser");
      // Check for success or error message
      if (result.output.successMessage) {
        message = result.output.successMessage;
        Id = result.output.Id;
        PrivacyNotice = result.output.PrivacyNotice;
        success = result.output.success;
      } else {
        message = result.output.errorMessage;
        success = result.output.success;
      }

      return { success, Id, PrivacyNotice, message };
    } catch (error) {
      console.error(error.message);
    }
  },

  UserPrivacyNotice: async (userId) => {
    try {
      let pool = await sql.connect(config);

      // Execute stored procedure to login user
      let result = await pool
        .request()
        .input("userId", sql.Int, userId)
        .output("success", sql.Bit)
        .execute("SpUserPrivacyNotice");

      const success = result.output.success;
      return { success };
    } catch (error) {
      console.error(error);
    }
  },

  getRoles: async () => {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().execute("SpGetRoles");
      return result.recordset;
    } catch (error) {
      console.error(error);
    }
  },

  getUserCategories: async (userId) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input("UserId", sql.Int, userId)
        .execute("SpUserCategories");
      return result.recordset;
    } catch (error) {
      console.error(error);
    }
  },

  getUserModules: async (userId) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input("UserId", sql.Int, userId)
        .execute("SpUserModules");
      return result.recordset;
    } catch (error) {
      console.error(error);
    }
  },

  getUserRole: async (userId) => {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("userId", sql.Int, userId)
        .execute("SpUserRol");
      return result.recordset;
    } catch (error) {
      console.error(error);
    }
  },

  ValidateUserEmail: async (user, email) => {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("User", sql.VarChar(sql.MAX), user)
        .input("Mail", sql.VarChar(sql.MAX), email)
        .output("MailExists", sql.Bit)
        .execute("SpValidateUserEmail");
      return result.output.MailExists;
    } catch (error) {
      console.error(error);
    }
  },

  insertPasswordResetToken: async (user, email, token) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('user', sql.VarChar(sql.MAX), user)
        .input('email', sql.VarChar(sql.MAX), email)
        .input('token', sql.VarChar(255), token)
        .output('Success', sql.Bit)
        .output('Message', sql.VarChar(sql.MAX))
        .execute('SpInsertPasswordResetToekns');

      return {
        success: result.output.Success,
        message: result.output.Message,
      };
    } catch (err) {
      console.error(err.message);
    }
  },

  ValidateChangePassword: async (user, email, token, NewPassword, ConfirmedNewPassword) => {
    try {
      console.log(user,email,token,NewPassword,ConfirmedNewPassword);
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('user', sql.VarChar(sql.MAX), user)
        .input('email', sql.VarChar(sql.MAX), email)
        .input('token', sql.VarChar(255), token)
        .input('NewPassword', sql.VarChar(255), NewPassword)
        .input('ConfirmedNewPassword', sql.VarChar(255), ConfirmedNewPassword)
        .output('OldPassword', sql.VarChar(255))
        .output('Success', sql.Bit)
        .output('Message', sql.VarChar(sql.MAX))
        .execute('SpValidateChangePassword');

      return {
        OldPassword: result.output.OldPassword,
        success: result.output.Success,
        message: result.output.Message,
      };
    } catch (err) {
      console.error(err.message);
    }
  },

  UpdateNewPassword: async (user, email, token, NewPassword) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('user', sql.VarChar(sql.MAX), user)
        .input('email', sql.VarChar(sql.MAX), email)
        .input('token', sql.VarChar(255), token)
        .input('NewPassword', sql.VarChar(255), NewPassword)
        .output('Success', sql.Bit)
        .output('Message', sql.VarChar(sql.MAX))
        .execute('SpUpdateNewPassword');

      return {
        success: result.output.Success,
        message: result.output.Message,
      };
    } catch (err) {
      console.error(err.message);
    }
  }
}