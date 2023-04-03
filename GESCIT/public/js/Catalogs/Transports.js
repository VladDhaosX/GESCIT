const UrlApi = window.__env.UrlApi;

$(document).ready(async function () {

    sessionStorage.setItem("TransportId", 0);
    sessionStorage.setItem("TemporalDocumentId", 0);

    await initButtons();
    await TransportsDataTable(true);
    await FillSelectTransportType();
    await FillSelectDocumentList();

    await tooltipTrigger();

});
//#region fetches
const GetTransports = async (userId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/getTransports`, type: 'POST', data: {
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

const GetTransportType = async () => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            }, url: `${UrlApi}/catalogs/getTransportType`, type: 'GET', dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const AddOrUpdateTransport = async (Transport) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/addOrUpdateTransport`, type: 'POST', data: {
                Transport
            }, // Enviar Transport en el cuerpo de la solicitud
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
        formData.append('ModuleId', TransportDocumentObj.TransportId);
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
        $('#ActionsButtons').append(`
                <button id="AddOrUpdateTransportModalButton" type="button" title="Registrar Transporte" 
                    class="btn rounded-pill btn-icon btn-outline-primary" 
                    data-bs-toggle="tooltip" data-bs-placement="top">
                    <span class="tf-icons bx bx-plus"></span>
                </button>
            `);

        $('#AddOrUpdateTransportModalButton').click(function () {
            AddOrUpdateTransportModal();
        });
        $('#AddOrUpdateTransportButton').click(function () {
            AddOrUpdateTransportButton()
        });

        $('#TransportPlate2 , #TransportPlate3').parent().hide();

        $('#TransportTypeSelect').change(function () {
            $('#TransportPlate2 , #TransportPlate3').parent().hide();
            let TransportTypeId = $(this).val();
            if (TransportTypeId == 2) {
                $('#TransportPlate2').parent().show();
            } else if (TransportTypeId == 5) {
                $('#TransportPlate2 , #TransportPlate3').parent().show();
            } else {
                $('#TransportPlate2 , #TransportPlate3').parent().hide();
            };
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
            let TransportId = sessionStorage.getItem("TransportId");
            let TemporalDocumentId = sessionStorage.getItem("TemporalDocumentId");
            await TransportDocumentsDataTable(TransportId, TemporalDocumentId);
        });

        //On Close Modal 
        $('#AddOrUpdateTransportModal').on('hidden.bs.modal', function () {
            const TransportId = sessionStorage.getItem("TransportId");
            const DocumentType = "Transporte";
            NotDeleteDocuments(TransportId, DocumentType);
        });

        //on TransportDocument change
        $('#TransportDocumentSelect').on('change', function () {
            //AddOrUpdateTransportDocumentButton val 0
            $('#TransportDocument').val("").trigger('change');
        });
    } catch (error) {
        console.error(error);
    }
};

const TransportsDataTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#TransportTable')) {
            $('#TransportTable').DataTable().destroy();
            $('#TransportTable').empty();
        }

        const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
        const data = await GetTransports(userId);
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
                                        id="AddOrUpdateTransportTableButton"
                                        data='${JSON.stringify(row)}'
                                        title='Editar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='AddOrUpdateTransportModal(this);'
                                    >
                                        <span class="tf-icons bx bx-edit-alt"></span>
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
            $('#TransportTable').DataTable({
                data: data,
                columns: columns,
                language: {
                    url: './js/datatable-esp.json'
                },
                "columnDefs": [
                    { "type": "num", "targets": 5 }
                ]
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const FillSelectTransportType = async () => {
    try {
        const data = await GetTransportType();

        var $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.Type);
            $options = $options.add($option);
        });

        $('#TransportTypeSelect').empty();
        $('#TransportTypeSelect').append($options);
    } catch (error) {
        console.error(error);
    }
};

const FillSelectDocumentList = async () => {
    try {
        const DocumentType = "Transporte"
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

const AddOrUpdateTransportModal = async (e) => {
    try {
        if (e) {
            const Transport = $(e).attr('data');
            const TransportObj = JSON.parse(Transport);

            sessionStorage.setItem("TransportId", TransportObj.Id);
            $('#TransportTypeSelect').val(TransportObj.TransportTypeId).trigger('change');
            $('#TransportPlate1').val(TransportObj["Placa de Transporte"]);
            $('#TransportPlate2').val(TransportObj["Placa de Caja #1"]);
            $('#TransportPlate3').val(TransportObj["Placa de Caja #2"]);
            $('#Capacity').val(TransportObj["Capacidad en Toneladas"]);
        } else {
            sessionStorage.setItem("TransportId", 0);
            $('#TransportTypeSelect').val(0);
            $('#TransportPlate1').val("");
            $('#TransportPlate2').val("");
            $('#TransportPlate3').val("");
            $('#Capacity').val("");
        };

        sessionStorage.setItem("TemporalDocumentId", 0);
        $('#TransportDocumentSelect').val(0);
        $('#TransportTypeSelect').trigger('change');
        $('#AddOrUpdateTransportModal').modal('show');
        $('#DocumentsModalNavs button:first').tab('show');
    } catch (error) {
        console.error(error);
    }
};

const AddOrUpdateTransportButton = async () => {
    try {
        const TransportId = sessionStorage.getItem("TransportId");
        const UserId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
        const TransportTypeId = $('#TransportTypeSelect').val();
        const TransportPlate1 = $('#TransportPlate1').val();
        const TransportPlate2 = $('#TransportPlate2').val();
        const TransportPlate3 = $('#TransportPlate3').val();
        const Capacity = $('#Capacity').val();
        const TemporalDocumentId = sessionStorage.getItem('TemporalDocumentId');
        const Transport = {
            TransportId,
            TemporalDocumentId,
            UserId,
            TransportTypeId,
            TransportPlate1,
            TransportPlate2,
            TransportPlate3,
            Capacity
        };

        const response = await AddOrUpdateTransport(Transport);
        const toastType = response.success ? "Primary" : "Danger";
        const toastPlacement = response.success ? "Top right" : "Middle center";
        if (response.success) $('#AddOrUpdateTransportModal').modal('hide');

        await ToastsNotification("Transportes", response.message, toastType, toastPlacement);
        await TransportsDataTable(false);

    } catch (error) {
        console.error(error);
    }
};

const AddOrUpdateTransportDocumentButton = async () => {
    try {
        const TransportId = sessionStorage.getItem("TransportId");
        const TransportDocument = $('#TransportDocument')[0];
        const TransportDocumentFile = TransportDocument.files[0];

        if (TransportDocumentFile.size > 10485760) {
            await ToastsNotification("Transportes", "Tamaño máximo permitido: 10 MB", "Danger", "Middle center");
            return;
        };

        const TransportDocumentObj = {
            userId: sessionStorage.getItem('userId'),
            TemporalDocumentId: sessionStorage.getItem('TemporalDocumentId'),
            TransportId: TransportId,
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


        TransportDocumentsDataTable(TransportId, TemporalDocumentId);

    } catch (error) {
        console.error(error);
    }
};

const TransportDocumentsDataTable = async (TransportId, TemporalDocumentId) => {
    try {
        if ($.fn.DataTable.isDataTable('#TransportDocumentDataTable')) {
            $('#TransportDocumentDataTable').DataTable().destroy();
            $('#TransportDocumentDataTable').html('');
        };
        const DocumentType = "Transporte";
        const data = await GetTransportDocument(DocumentType, TransportId, TemporalDocumentId);
        if (data.length > 0) {
            const columns = [
                {
                    title: 'Acciones',
                    data: 'Id',
                    "render": function (data, type, row) {
                        const StatusId = row.StatusId;
                        if (StatusId == 4) {
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
                                `
                        }
                        else {
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
        const TransportId = sessionStorage.getItem('TransportId');
        const TemporalDocumentId = sessionStorage.getItem('TemporalDocumentId');
        let data = $(e).attr('data');
        let dataObj = JSON.parse(data);
        let DocumentId = dataObj.Id;

        const response = await DeleteDocumentById(DocumentId);
        let toastType = 'Primary';
        let toastPlacement = 'Top right';

        if (response.success) {
            TransportDocumentsDataTable(TransportId, TemporalDocumentId);
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