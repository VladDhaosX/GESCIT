const UrlApi = window.__env.UrlApi;

$(document).ready(async function () {

    sessionStorage.setItem("TransportLineId", 0);
    sessionStorage.setItem("TemporalDocumentId", 0);

    await initButtons();
    await TransportLinesDataTable(true);
    await FillSelectTransportLineType();
    await tooltipTrigger();
    await FillSelectDocumentList();
});

//#region fetchs
const GetTransportLines = async (userId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/getTransportLines`, type: 'POST', data: {
                userId
            }, // Enviar userId en el cuerpo de la solicitud
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const GetTransportLineType = async () => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            }, url: `${UrlApi}/catalogs/getTransportLineTypes`, type: 'GET', dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const GetTransportLineDocuments = async () => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            }, url: `${UrlApi}/catalogs/getTransportLineDocuments`, type: 'GET', dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const AddOrUpdateTransportLine = async (TransportLine) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/addOrUpdateTransportLine`,
            type: 'POST',
            data: {
                TransportLine
            }, // Enviar TransportLine en el cuerpo de la solicitud
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
        $.unblockUI();
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
        $.unblockUI();
    }
};
const AddOrUpdateTransportDocument = async (TransportDocumentObj) => {
    try {
        let formData = new FormData();

        formData.append('userId', TransportDocumentObj.userId);
        formData.append('TemporalDocumentId', TransportDocumentObj.TemporalDocumentId);
        formData.append('ModuleId', TransportDocumentObj.TransportLineId);
        formData.append('image', TransportDocumentObj.TransportDocumentFile);
        formData.append('DocumentId', TransportDocumentObj.DocumentId);

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
const GetTransportDocument = async (DocumentType, ModuleId, TemporalDocumentId) => {
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
const GetTransportDocumentById = (DocumentId) => {
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
//#endregion
//#region Controllers
const initButtons = async () => {
    try {
        const userRolKey = sessionStorage.getItem('userRolKey');
        if (userRolKey != 'Juridico') {
            $('#ActionsButtons').append(`
                <button id="AddOrUpdateTransportLineModalButton" type="button" title="Registrar Linea de Transporte" 
                    class="btn rounded-pill btn-icon btn-outline-primary" 
                    data-bs-toggle="tooltip" data-bs-placement="top">
                    <span class="tf-icons bx bx-plus"></span>
                </button>
            `);
        };
        $('#AddOrUpdateTransportLineModalButton').click(async function () {
            await AddOrUpdateTransportLineModal();
        });

        $('#AddOrUpdateTransportLineButton').click(async function () {
            await AddOrUpdateTransportLineButton()
        });

        $('#AddOrUpdateTransportDocumentButton').click(function () {
            AddOrUpdateTransportDocumentButton();
        });

        $('#TransportDocument').on('change', function () {
            const TransportDocument = $(this)[0];
            const TransportDocumentFile = TransportDocument.files[0];

            if (TransportDocumentFile) {
                $('#TransportDocument').attr('style', '');
            } else {
                $('#TransportDocument').attr('style', 'color: transparent');
            }
        });

        $('#DocumentsNavButton').on('shown.bs.tab', async function (e) {
            let TransportLineId = sessionStorage.getItem("TransportLineId");
            let TemporalDocumentId = sessionStorage.getItem("TemporalDocumentId");
            await TransportDocumentsDataTable(TransportLineId, TemporalDocumentId);
        });

        //On Close Modal 
        $('#AddOrUpdateTransportModal').on('hidden.bs.modal', function () {
            const TransportLineId = sessionStorage.getItem("TransportLineId");
            const DocumentType = "Transporte";
            NotDeleteDocuments(TransportLineId, DocumentType);
        });

        //on TransportDocument change
        $('#TransportDocumentSelect').on('change', function () {
            //AddOrUpdateTransportDocumentButton val 0
            $('#TransportDocument').val("").trigger('change');
        });

        $('#myModal').on('hidden.bs.modal', function (e) {
            // do something...
        })

    } catch (error) {
        console.error(error);
    }
};

const TransportLinesDataTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#TransportLineTable')) {
            $('#TransportLineTable').DataTable().destroy();
        }

        const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
        const data = await GetTransportLines(userId);
        if (data.length > 0) {
            // Crea el arreglo de objetos para las columnas del DataTable
            const columns = [
                {
                    title: 'Acciones',
                    data: 'Id',
                    "render": function (data, type, row) {
                        return `
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary" 
                                        type="button" 
                                        id="AddOrUpdateTransportLineTableButton"
                                        data='${JSON.stringify(row)}'
                                        title='Editar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='AddOrUpdateTransportLineModal(this);'
                                    >
                                        <span class="tf-icons bx bx-edit-alt"></span>
                                    </button>
                                `
                    }
                },
                ...Object.keys(data[0]).map(propName => ({
                    title: propName,
                    data: propName,
                    visible: !propName.includes('Id'),
                    render: function (data) {
                        return propName === "Capacidad" ? data + " Toneladas" : data
                    }
                }))
            ];
            $('#TransportLineTable').DataTable({
                data: data,
                columns: columns,
                language: {
                    url: './js/datatable-esp.json'
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const FillSelectTransportLineType = async () => {
    try {
        const data = await GetTransportLineType();

        var $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.Type);
            $options = $options.add($option);
        });

        $('#TransportLineTypeSelect').empty();
        $('#TransportLineTypeSelect').append($options);
    } catch (error) {
        console.error(error);
    }
};

const AddOrUpdateTransportLineModal = async (e) => {
    try {
        $('#AddOrUpdateTransportLineModal').modal('show');
        let TransportLineId = 0;
        let TemporalDocumentId = 0;
        if (e) {
            const TransportLine = $(e).attr('data');
            const TransportLineObj = JSON.parse(TransportLine);

            TransportLineId = TransportLineObj.Id;
            sessionStorage.setItem("TransportLineId", TransportLineId);

            $('#TransportLineTypeSelect').val(TransportLineObj.LineTypeId);
            $('#LineName').val(TransportLineObj['Línea de Transporte']);
        } else {
            sessionStorage.setItem("TransportLineId", TransportLineId);
            sessionStorage.setItem("TemporalDocumentId", TemporalDocumentId);

            $('#TransportLineTypeSelect').val(0);
            $('#LineName').val("");
        };

        sessionStorage.setItem("TemporalDocumentId", 0);
        $('#DocumentLineSelect').val(0);
        $('#LineDocument').val("");
        $('#DocumentsModalNavs button:first').tab('show');

        const userRolKey = sessionStorage.getItem('userRolKey');
        if (userRolKey === 'Juridico') {
            $('#InfoNavButton').hide();
            $('#DocumentsNavButton').show();
            //navsInfoModal remove class show active
            $('#navsInfoModal').removeClass('show');
            $('#navsInfoModal').removeClass('active');

            $('#DocumentsNavButton').addClass('active');
            $('#navsDocsModal').addClass('show');
            $('#navsDocsModal').addClass('active');
            let TransportLineId = sessionStorage.getItem("TransportLineId");
            let TemporalDocumentId = sessionStorage.getItem("TemporalDocumentId");

            setTimeout(async function () {
                await TransportDocumentsDataTable(TransportLineId, TemporalDocumentId);
            }, 500);

        } else {
            $('#InfoNavButton').show();
            $('#DocumentsNavButton').hide();
            $('#DocumentsModalNavs button:first').tab('show');
        };
    } catch (error) {
        console.error(error);
    }
};

const AddOrUpdateTransportLineButton = async () => {
    try {
        let TransportLineId = sessionStorage.getItem("TransportLineId");
        let TemporalDocumentId = sessionStorage.getItem("TemporalDocumentId");
        const userId = sessionStorage.getItem("userId");
        const LineName = $('#LineName').val();
        const TransportLineTypeSelect = $('#TransportLineTypeSelect').val();

        const TransportLine = {
            TransportLineId: TransportLineId,
            TemporalDocumentId: TemporalDocumentId,
            userId: userId,
            Name: LineName,
            TransportLineTypeId: TransportLineTypeSelect,
        };

        const response = await AddOrUpdateTransportLine(TransportLine);
        let toastType = 'Primary';
        let toastPlacement = 'Top right';

        if (response.success) {
            TransportLineId = response.TransportLineId;
            TemporalDocumentId = response.TemporalDocumentId;
            sessionStorage.setItem("TransportLineId", TransportLineId);
            TransportLinesDataTable();
            $('#AddOrUpdateTransportLineModal').modal('hide');
        } else {
            toastType = 'Danger';
            toastPlacement = 'Middle center';
        };

        await ToastsNotification("Líneas de Transporte", response.message, toastType, toastPlacement);

    } catch (error) {
        console.error(error);
    }
};

const FillSelectDocumentList = async () => {
    try {
        const DocumentType = "Linea Transportista"
        const data = await GetDocumentsList(DocumentType);

        var $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            console.log(value);
            const $option = $('<option>').attr('value', value.Id).text(value.Name);
            $options = $options.add($option);
        });

        $('#TransportDocumentSelect').empty();
        $('#TransportDocumentSelect').append($options);
    } catch (error) {
        console.error(error);
    }
};

const AddOrUpdateTransportDocumentButton = async () => {
    try {
        const TransportLineId = sessionStorage.getItem("TransportLineId");
        const TransportDocument = $('#TransportDocument')[0];
        const TransportDocumentFile = TransportDocument.files[0];

        if (TransportDocumentFile.size > 10485760) {
            await ToastsNotification("Transportes", "Tamaño máximo permitido: 10 MB", "Danger", "Middle center");
            return;
        };

        const TransportDocumentObj = {
            userId: sessionStorage.getItem('userId'),
            TemporalDocumentId: sessionStorage.getItem('TemporalDocumentId'),
            TransportLineId: TransportLineId,
            TransportDocumentFile: TransportDocumentFile,
            DocumentId: $('#TransportDocumentSelect').val()
        };

        const response = await AddOrUpdateTransportDocument(TransportDocumentObj);

        if (response.success) {
            TemporalDocumentId = response.TemporalDocumentId;
            sessionStorage.setItem('TemporalDocumentId', TemporalDocumentId);
            await ToastsNotification("Transportes", "Se subio el archivo con exito.", "Primary", "Top right");
            $('#TransportDocument').val("").trigger('change');
        } else {
            await ToastsNotification("Transportes", response.message, "Danger", "Middle center");
        };


        TransportDocumentsDataTable(TransportLineId, TemporalDocumentId);

    } catch (error) {
        console.error(error);
    }
};

const TransportDocumentsDataTable = async (TransportLineId, TemporalDocumentId) => {
    try {
        if ($.fn.DataTable.isDataTable('#TransportDocumentDataTable')) {
            $('#TransportDocumentDataTable').DataTable().destroy();
            $('#TransportDocumentDataTable').html('');
        };
        const DocumentType = "Linea Transportista"
        const data = await GetTransportDocument(DocumentType, TransportLineId, TemporalDocumentId);
        if (data.length > 0) {
            const columns = [
                {
                    title: 'Acciones',
                    data: 'Id',
                    "render": function (data, type, row) {
                        return `
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary" 
                                        type="button" 
                                        id="DonwloadTransportDocument"
                                        data='${JSON.stringify(row)}'
                                        title='Descargar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='DonwloadTransportDocument(this);'
                                    >
                                        <span class="tf-icons bx bxs-download"></span>
                                    </button>
                                    <button
                                        class="btn rounded-pill btn-icon btn-outline-danger" 
                                        type="button" 
                                        id="AddOrUpdateTransportTableButton"
                                        data='${JSON.stringify(row)}'
                                        title='Eliminar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='DeleteDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-trash"></span>
                                    </button>
                                `
                    }
                },
                ...Object.keys(data[0]).map(propName => ({
                    title: propName,
                    data: propName,
                    visible: !propName.includes('Id')
                }))
            ];
            $('#TransportDocumentDataTable').DataTable({
                data: data,
                columns: columns,
                language: {
                    url: './js/datatable-esp.json'
                }
            });
        }
    } catch (error) {
        console.error(error);
    };
};

const DonwloadTransportDocument = async (e) => {
    if (e) {
        const data = $(e).attr('data');
        const dataObj = JSON.parse(data);
        const DocumentId = dataObj.Id;

        GetTransportDocumentById(DocumentId);
    }
};

const DeleteDocument = async (e) => {
    try {
        const TransportLineId = sessionStorage.getItem('TransportLineId');
        const TemporalDocumentId = sessionStorage.getItem('TemporalDocumentId');
        let data = $(e).attr('data');
        let dataObj = JSON.parse(data);
        let DocumentId = dataObj.Id;

        const response = await DeleteDocumentById(DocumentId);

        let toastType = 'Primary';
        let toastPlacement = 'Top right';
        if (response.success) {
            await TransportDocumentsDataTable(TransportLineId, TemporalDocumentId);
        } else {
            toastType = 'Danger';
            toastPlacement = 'Middle center';
        };

        await ToastsNotification("Líneas de Transporte", response.message, toastType, toastPlacement);

    } catch (error) {
        console.error(error);
    }
};
//#endregion