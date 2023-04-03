const sql = require('mssql');
const config = require('../../config/database');

module.exports = {

    GetClientsByStatusDocs: async (Status) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('StatusKey', sql.VarChar(sql.MAX), Status)
                .execute('SpGetClientsByStatusDocs');
            return result.recordset;
        } catch (error) {
            console.error(error);
        }
    },

    GetDocumentsByClient: async (AccountNum, Status, DocumentType) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('AccountNum', sql.VarChar(sql.MAX), AccountNum)
                .input('StatusKey', sql.VarChar(sql.MAX), Status)
                .input('DocumentType', sql.VarChar(sql.MAX), DocumentType)
                .execute('SpGetDocumentsByClient');
            return result.recordset;
        } catch (error) {
            console.error(error);
        }
    },

    UpdateDocumentStatus: async (DocumentFileId, NewStatus) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('DocumentFileId', sql.Int, DocumentFileId)
                .input('NewStatus', sql.VarChar(sql.MAX), NewStatus)
                .output('Success', sql.Bit)
                .output('Message', sql.VarChar(sql.MAX))
                .execute('SpUpdateDocumentStatus');
            return result;
        } catch (error) {
            console.error(error);
        }
    },

};
