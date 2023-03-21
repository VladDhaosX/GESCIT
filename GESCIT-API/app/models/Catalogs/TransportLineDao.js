const sql = require('mssql');
const config = require('../../config/database');

module.exports = {
    addOrUpdateTransportLine: async (TransportLine) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .output('TransportLineId', sql.Int, TransportLine.TransportLineId)
                .output('TemporalDocumentId', sql.Int, TransportLine.TemporalDocumentId)
                .input('UserId', sql.Int, TransportLine.userId)
                .input('Name', sql.VarChar(255), TransportLine.Name)
                .input('LineTypeId', sql.Int, TransportLine.TransportLineTypeId)
                .output('Success', sql.Bit)
                .output('Message', sql.VarChar(100))
                .execute('SpAddOrUpdateTransportLine');

            return {
                TransportLineId: result.output.TransportLineId,
                TemporalDocumentId: result.output.TemporalDocumentId,
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

    getTransportLines: async (userId) => {
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
    },

    getTransportLineTypes: async () => {
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
    },

    getTransportLineDocuments: async () => {
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
            return {
                success: false,
                message: error.message,
                error: error,
            };
        }
    },

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

    GetLineDocumentById: async (fileId) => {
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
