const sql = require('mssql');
const config = require('../../config/database');

module.exports = {
    addOrUpdateTransport: async (transport) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('TransportId', sql.Int, transport.TransportId)
                .input('UserId', sql.Int, transport.UserId)
                .input('TransportTypeId', sql.Int, transport.TransportTypeId)
                .input('TransportPlate1', sql.VarChar(20), transport.TransportPlate1)
                .input('TransportPlate2', sql.VarChar(20), transport.TransportPlate2)
                .input('TransportPlate3', sql.VarChar(20), transport.TransportPlate3)
                .input('Capacity', sql.Int, transport.Capacity)
                .output('Success', sql.Bit)
                .output('Message', sql.VarChar(sql.MAX))
                .execute('SpAddOrUpdateTransport');

            return {
                success: result.output.Success,
                message: result.output.Message,
                data: result.recordset,
                type: "db"
            };
        } catch (error) {
            console.error("DaoError: " + error.message);
            return {
                success: false,
                message: error.message,
                type: "DaoError"
            };
        }
    },

    getTransports: async (UserId) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('UserId', sql.Int, UserId)
                .execute('SpGetTransports');

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

    getTransportType: async () => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .execute('SpGetTransportType');

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

    getTransportDocumentType: async () => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .execute('SpGetTransportDocumentType');

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

    AddOrUpdateTransportDocument: async (fileContent, userId, temporalDocumentId, documentId, moduleId, fieldName, originalName, mimetype, size) => {
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
                .execute('SpAddOrUpdateTransportDocument');

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
    
    GetTransportDocumentById: async (fileId) => {
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
