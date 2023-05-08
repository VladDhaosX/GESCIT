const UrlApi = window.__env.UrlApi;

const GetDrivers = async (UserId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/GetDrivers`, type: 'POST', data: {
                UserId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
    }
};

const GetDocumentsList = async (DocumentType) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            }
            , complete: function () {
                $.unblockUI();
            }
            , url: `${UrlApi}/documents/GetDocumentsList`
            , type: 'POST'
            , dataType: 'json'
            , data: {
                DocumentType: DocumentType
            }
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
    }
};

const AddOrUpdateDriver = async (Driver) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/addOrUpdateDriver`,
            type: 'POST',
            data: {
                Driver
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const GetDriverDocument = async (DocumentType, ModuleId, TemporalDocumentId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/documents/GetDocumentFilesByModuleId`,
            type: 'POST',
            data: {
                DocumentType, ModuleId, TemporalDocumentId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const AddOrUpdateDriverDocument = async (DriverDocument) => {
    try {
        let formData = new FormData();

        formData.append('userId', DriverDocument.userId);
        formData.append('TemporalDocumentId', DriverDocument.TemporalDocumentId);
        formData.append('ModuleId', DriverDocument.DriverId);
        formData.append('image', DriverDocument.DriverDocumentFile);
        formData.append('DocumentId', DriverDocument.DocumentId);

        const response = await $.ajax({
            beforeSend: async function (xhr) {
                await $.blockUI({ message: null });
            },
            complete: async function () {
                await $.unblockUI();
            },
            url: `${UrlApi}/documents/AddDocumentFile`,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false
        });
        return response;
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetDriverDocumentById = (DocumentId) => {
    try {
        $.ajax({
            beforeSend: async function (xhr) {
                await $.blockUI({ message: null });
            },
            complete: async function () {
                await $.unblockUI();
            },
            url: `${UrlApi}/documents/GetDocumentById`,
            type: 'POST',
            data: {
                DocumentId
            },
            dataType: 'binary',
            xhrFields: {
                responseType: 'blob'
            },
            success: function (data, textStatus, jqXHR) {
                var fileName = jqXHR.getResponseHeader('Content-Disposition').split('filename=')[1];

                var blob = data;
                var bloburl = window.URL.createObjectURL(blob);

                var link = document.createElement('a');
                link.href = bloburl;
                link.download = fileName;
                link.click();
            }
        });
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const DeleteDocumentById = async (DocumentId) => {
    try {
        return await $.ajax({
            beforeSend: async function (xhr) {
                await $.blockUI({ message: null });
            },
            complete: async function () {
                await $.unblockUI();
            },
            url: `${UrlApi}/documents/DeleteDocumentById`,
            type: 'POST',
            data: {
                DocumentId
            },
            dataType: 'json'
        });
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const NotDeleteDocuments = async (ModuleId, DocumentType) => {
    try {
        return await $.ajax({
            beforeSend: async function (xhr) {
                await $.blockUI({ message: null });
            },
            complete: async function () {
                await $.unblockUI();
            },
            url: `${UrlApi}/documents/NotDeleteTransportDocuments`,
            type: 'POST',
            data: {
                ModuleId, DocumentType
            },
            dataType: 'json'
        });
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
