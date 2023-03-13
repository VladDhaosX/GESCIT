const sql = require('mssql');
const config = require('../../config/database');

const login = async (username, password) => {
  try {
    let pool = await sql.connect(config);
    let userId = "";
    let successMessage = "";
    let errorMessage = "";

    // Execute stored procedure to login user
    let result = await pool.request()
      .input('username', sql.VarChar(50), username)
      .input('password', sql.VarChar(50), password)
      .output('successMessage', sql.VarChar(100))
      .output('errorMessage', sql.VarChar(100))
      .output('userId', sql.Int)
      .execute('SpLoginUser');
    // Check for success or error message
    if (result.output.successMessage) {
      successMessage = result.output.successMessage;
      userId = result.output.userId;
    } else {
      errorMessage = result.output.errorMessage;
    }

    return { userId,successMessage,errorMessage };

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
      .input('userId', sql.Int,userId)
      .output('successMessage', sql.VarChar(100))
      .execute('SpUserPrivacyNotice');
    // Check for success or error message
    if (result.output.successMessage) {
      successMessage = result.output.successMessage;
    } else {
      errorMessage = result.output.errorMessage;
    }

    return { successMessage,errorMessage };

  } catch (error) {
    console.error(error);
  }
};

const getRoles = async () => {
  try {
    let pool = await sql.connect(config);
    let categorias = await pool.request().query('SELECT * from Roles');
    return categorias.recordsets;
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
  login: login,
  UserPrivacyNotice: UserPrivacyNotice,
  getRoles: getRoles,
  getUserCategories: getUserCategories,
  getUserModules: getUserModules,
  getUserRole: getUserRole
};
