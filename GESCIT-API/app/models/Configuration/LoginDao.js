const sql = require('mssql');
const config = require('../../config/database');

const validateUser = async (username, password) => {
  try {
    let pool = await sql.connect(config);
    let Id = 0;
    let success = false;
    let PrivacyNotice = 0;
    let successMessage = "";
    let errorMessage = "";

    // Execute stored procedure to login user
    let result = await pool.request()
      .input('username', sql.VarChar(50), username)
      .input('password', sql.VarChar(50), password)
      .output('success', sql.Bit)
      .output('Id', sql.Int)
      .output('PrivacyNotice', sql.Int)
      .output('successMessage', sql.VarChar(100))
      .output('errorMessage', sql.VarChar(100))
      .execute('SpValidateUser');
    // Check for success or error message
    if (result.output.successMessage) {
      successMessage = result.output.successMessage;
      Id = result.output.Id;
      PrivacyNotice = result.output.PrivacyNotice;
      success = result.output.success;
    } else {
      errorMessage = result.output.errorMessage;
      success = result.output.success;
    }

    return { success, Id, PrivacyNotice, successMessage, errorMessage };

  } catch (error) {
    console.error(error);
  }
};

const AddOrUpdateUser = async (AccountNum, name, mail, userName, userTypeId, password) => {
  try {
    let pool = await sql.connect(config);
    let Id = 0;
    let success = false;
    let PrivacyNotice = 0;
    let successMessage = "";
    let errorMessage = "";

    // Execute stored procedure to login user
    let result = await pool.request()
      .input('AccountNum', sql.VarChar(50), AccountNum)
      .input('name', sql.VarChar(50), name)
      .input('mail', sql.VarChar(50), mail)
      .input('userName', sql.VarChar(50), userName)
      .input('userTypeId', sql.Int, userTypeId)
      .input('password', sql.VarChar(50), password)
      .output('success', sql.Bit)
      .output('Id', sql.Int)
      .output('PrivacyNotice', sql.Int)
      .output('successMessage', sql.VarChar(100))
      .output('errorMessage', sql.VarChar(100))
      .execute('SpAddOrUpdateUser');
    // Check for success or error message
    if (result.output.successMessage) {
      successMessage = result.output.successMessage;
      Id = result.output.Id;
      PrivacyNotice = result.output.PrivacyNotice;
      success = result.output.success;
    } else {
      errorMessage = result.output.errorMessage;
      success = result.output.success;
    }

    return { success, Id, PrivacyNotice, successMessage, errorMessage };

  } catch (error) {
    console.error(error);
  }
};

const UserPrivacyNotice = async (userId) => {
  try {
    let pool = await sql.connect(config);
    let successMessage = "";
    let errorMessage = "";

    // Execute stored procedure to login user
    let result = await pool.request()
      .input('userId', sql.Int, userId)
      .output('successMessage', sql.VarChar(100))
      .execute('SpUserPrivacyNotice');
    // Check for success or error message
    if (result.output.successMessage) {
      successMessage = result.output.successMessage;
    } else {
      errorMessage = result.output.errorMessage;
    }

    return { successMessage, errorMessage };

  } catch (error) {
    console.error(error);
  }
};

const getRoles = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .execute('SpGetRoles');
    return result.recordset;
  } catch (error) {
    console.error(error);
  }
};

const getUserCategories = async (userId) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('UserId', sql.Int, userId)
      .execute('SpUserCategories');
    return result.recordset;
  } catch (error) {
    console.error(error);
  }
};

const getUserModules = async (userId) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('UserId', sql.Int, userId)
      .execute('SpUserModules');
    return result.recordset;
  } catch (error) {
    console.error(error);
  }
};

const getUserRole = async (userId) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('userId', sql.Int, userId)
      .execute('SpUserRol');
    return result.recordset;
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
  validateUser,
  AddOrUpdateUser,
  UserPrivacyNotice,
  getRoles,
  getUserCategories,
  getUserModules,
  getUserRole
};
