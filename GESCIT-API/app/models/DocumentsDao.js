const sql = require('mssql');
const config = require('../config/database');

module.exports = {

    GetTransportDocument: async (TransportId, TemporalDocumentId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('TransportId', sql.Int, TransportId)
                .input('TemporalDocumentId', sql.Int, TemporalDocumentId)
                .execute('SpGetTransportDocument');

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

    // <--- TRANSPORT LINES ROUTES ---> 
    AddOrUpdateLineDocuments: async (fileContent, userId, temporalDocumentId, documentId, moduleId, fieldName, originalName, mimetype, size) => {
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
                .execute('SpAddOrUpdateLineDocuments');

            console.log(result.recordset);
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

    GetLineDocuments: async (TransportLineId, TemporalDocumentId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('TransportLineId', sql.Int, TransportLineId)
                .input('TemporalDocumentId', sql.Int, TemporalDocumentId)
                .execute('SpGetLineDocuments');

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

    // <--- DRIVERS ROUTES ---> 
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

    AddDocumentFile: async (fileContent, userId, temporalDocumentId, documentId, moduleId, fieldName, originalName, mimetype, size) => {
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
                message: "Consulta realizada con exito.",
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
    }
};