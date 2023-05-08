const sql = require('mssql');
const config = require('../../config/database');

module.exports = {

    AddDocumentFile: async (fileContent, userId, temporalDocumentId, documentId, moduleId, fieldName, originalName, mimetype, size, ExpiredDate, IssueDate) => {
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
                .input('ExpiredDate', sql.DateTime, ExpiredDate)
                .input('IssueDate', sql.DateTime, IssueDate)
                .output('Success', sql.BIT)
                .output('Message', sql.VarChar(sql.MAX))
                .execute('SpAddDocumentFile');

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

    GetDocumentFilesByModuleId: async (DocumentType, ModuleId, TemporalDocumentId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('DocumentType', sql.VarChar(sql.MAX), DocumentType)
                .input('ModuleId', sql.Int, ModuleId)
                .input('TemporalDocumentId', sql.Int, TemporalDocumentId)
                .execute('SpGetDocumentFilesByModuleId');

            return {
                success: true,
                message: "Consulta realizada con éxito.",
                data: result.recordset
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
                error: error,
            };
        }
    },

    GetDocumentsList: async (DocumentType) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('DocumentType', sql.VarChar(255), DocumentType)
                .output('Success', sql.BIT)
                .output('Message', sql.VarChar(sql.MAX))
                .execute('SpGetDocumentsList');

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
    },

    GetDocumentById: async (fileId) => {
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
    },

    NotDeleteDocuments: async (ModuleId, DocumentType) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('ModuleId', sql.Int, ModuleId)
                .input('DocumentType', sql.VarChar(sql.MAX), DocumentType)
                .execute('SpNotDeleteDocuments');

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

    SaveDriverPhoto: async (DateId, fileContent, fieldname, originalname, mimetype, size) => {
        try {
            const fileData = Buffer.from(fileContent);
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('DateId', sql.Int, DateId)
                .input('FieldName', sql.VarChar(255), fieldname)
                .input('OriginalName', sql.VarChar(255), originalname)
                .input('Mimetype', sql.VarChar(255), mimetype)
                .input('FileData', sql.VarBinary(sql.MAX), fileData)
                .input('Size', sql.INT, size)
                .output('Success', sql.BIT)
                .output('Message', sql.VarChar(sql.MAX))
                .execute('SpSaveDriverPhoto');

            return {
                success: result.output.Success,
                message: result.output.Message,
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                error: error,
            };
        }
    },
    GetDriverPhoto: async (DateId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('DateId', sql.Int, DateId)
                .execute('SpGetDriverPhoto');

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
};