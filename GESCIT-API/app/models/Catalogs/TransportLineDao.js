const sql = require('mssql');
const config = require('../../config/database');

const addOrUpdateTransportLine = async (TransportLine) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('TransportLineId', sql.Int, TransportLine.TransportLineId)
            .input('UserId', sql.Int, TransportLine.userId)
            .input('Name', sql.VarChar(255), TransportLine.Name)
            .input('LineTypeId', sql.Int, TransportLine.TransportLineTypeId)
            .output('Success', sql.Bit)
            .output('Message', sql.VarChar(50))
            .execute('SpAddOrUpdateTransportLine');

        return {
            success: result.output.Success,
            message: result.output.Message,
            data: result.recordset
        };
    } catch (error) {
        return {
          success: false,
          message: error.message,
          error: error,
        };
    }
};

const getTransportLines = async (userId) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('UserId', sql.Int, userId)
            .execute('SpGetTransportLines');

            return {
                success: true,
                message: "Consulta realizada con exito.",
                data: result.recordset
            };
    } catch (error) {
        return {
          success: false,
          message: error.message,
          error: error,
        };
    }
};

const getTransportLineTypes = async () => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .execute('SpGetTransportLineTypes');

            return {
                success: true,
                message: "Consulta realizada con exito.",
                data: result.recordset
            };
    } catch (error) {
        return {
          success: false,
          message: error.message,
          error: error,
        };
    }
};

const getTransportLineDocuments = async () => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .execute('SpGetTransportLineDocuments');

            return {
                success: true,
                message: "Consulta realizada con exito.",
                data: result.recordset
            };
    } catch (error) {
        console.log(error.message);
        return {
          success: false,
          message: error.message,
          error: error,
        };
    }
};

const AddOrUpdateLineDocuments = async (userId, TransportLineId, fileData) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('fileData', sql.VarBinary(sql.MAX), fileData)
            .execute('SpAddOrUpdateLineDocuments');

            return {
                success: true,
                message: "Consulta realizada con exito.",
                data: result.recordset
            };
    } catch (error) {
        console.log(error.message);
        return {
          success: false,
          message: error.message,
          error: error,
        };
    }
};

module.exports = {
    addOrUpdateTransportLine,
    getTransportLines,
    getTransportLineTypes,
    getTransportLineDocuments,
    AddOrUpdateLineDocuments
};
