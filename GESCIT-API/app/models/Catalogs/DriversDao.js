const sql = require('mssql');
const config = require('../../config/database');

module.exports = {
    addOrUpdateDriver: async (driver) => {
        try {
            const pool = await sql.connect(config);
            const request = pool.request();
            request.input('UserId', sql.Int, driver.UserId);
            request.input('TemporalDocumentId', sql.Int, driver.TemporalDocumentId);
            request.input('DriverId', sql.Int, driver.DriverId);
            request.input('FirstName', sql.VarChar(255), driver.FirstName);
            request.input('LastName', sql.VarChar(255), driver.LastName);
            request.input('SecondLastName', sql.VarChar(255), driver.SecondLastName);
            request.input('PhoneNumber', sql.VarChar(20), driver.PhoneNumber);
            request.input('Birthdate', sql.Date, driver.Birthdate);
            request.output('Success', sql.Bit);
            request.output('Message', sql.VarChar(100));
            const result = await request.execute('SpAddOrUpdateDriver');

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
    GetDrivers: async (UserId) => {
        try {
            const pool = await sql.connect(config);
            const request = pool.request();
            request.input('UserId', sql.Int, UserId);
            const result = await request.execute('SpGetDrivers');

            return {
                success: true,
                data: result.recordset
            };
        } catch (error) {
            return {
                success: false,
                message: error
            };
        }
    },
    GetDriversDocuments: async () => {
        try {
            const pool = await sql.connect(config);
            const request = pool.request();
            const result = await request.execute('SpGetDriversDocuments');

            return {
                success: true,
                data: result.recordset
            };
        } catch (error) {
            return {
                success: false,
                message: error
            };
        }
    },
    AddOrUpdateDriverDocument: async (fileContent, userId, temporalDocumentId, documentId, moduleId, fieldName, originalName, mimetype, size) => {
        try {
            const fileData = Buffer.from(fileContent);
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('UserId', sql.INT, userId)
                .output('TemporalDocumentId', sql.INT, temporalDocumentId)
                .input('DocumentId', sql.INT, documentId)
                .input('ModuleId', sql.INT, moduleId)
                .input('FieldName', sql.VarChar(255), fieldName)
                .input('OriginalName', sql.VarChar(255), originalName)
                .input('Mimetype', sql.VarChar(255), mimetype)
                .input('FileData', sql.VarBinary(sql.MAX), fileData)
                .input('Size', sql.INT, size)
                .output('Success', sql.BIT)
                .output('Message', sql.VarChar(sql.MAX))
                .execute('SpAddOrUpdateDriverDocument');

            return {
                success: result.output.Success,
                message: result.output.Message,
                TemporalDocumentId: result.output.TemporalDocumentId
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                error: error,
            };
        }
    },

    GetDriverDocumentById: async (fileId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('DocumentFilId', sql.Int, fileId)
                .execute('SpGetFileById');

            return {
                success: true,
                message: "Consulta realizada con exito.",
                data: result.recordset[0]
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                error: error,
            };
        }
    },

    GetDriverDocuments: async (DriverId, TemporalDocumentId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('DriverId', sql.Int, DriverId)
                .input('TemporalDocumentId', sql.Int, TemporalDocumentId)
                .execute('SpGetDriverDocuments');

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
    },

    DeleteDocumentById: async (DocumentFileId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('DocumentFileId', sql.Int, DocumentFileId)
                .output('Success', sql.BIT)
                .output('Message', sql.VarChar(sql.MAX))
                .execute('SpDeleteDocumentById');

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
    }
};
