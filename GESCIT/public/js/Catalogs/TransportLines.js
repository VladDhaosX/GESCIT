const UrlApi = window.__env.UrlApi;

$(document).ready(async function () {

    sessionStorage.setItem("TransportLineId", 0);
    sessionStorage.setItem("TemporalDocumentId", 0);

    await initButtons();
    await TransportLinesDataTable(true);
    await FillSelectTransportLineType();
    await FillSelectDocumentLine();
    await tooltipTrigger();

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
const GetLineDocument = async (TransportLineId, TemporalDocumentId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/GetLineDocument`, type: 'POST', data: {
                TransportLineId, TemporalDocumentId
            }, // Enviar userId en el cuerpo de la solicitud
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const AddOrUpdateLineDocument = async (TransportLineDocument) => {
    try {
        let formData = new FormData();

        formData.append('userId', TransportLineDocument.userId);
        formData.append('TemporalDocumentId', TransportLineDocument.TemporalDocumentId);
        formData.append('TransportLineId', TransportLineDocument.TransportLineId);
        formData.append('image', TransportLineDocument.LineDocumentFile);
        formData.append('DocumentId', TransportLineDocument.DocumentId);

        const response = await $.ajax({
            beforeSend: async function (xhr) {
                await $.blockUI({ message: null });
            },
            complete: async function () {
                await $.unblockUI();
            },
            url: `${UrlApi}/catalogs/AddOrUpdateLineDocument`,
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
const GetLineDocumentById = (DocumentId) => {
    try {
        $.ajax({
            beforeSend: async function (xhr) {
                await $.blockUI({ message: null });
            },
            complete: async function () {
                await $.unblockUI();
            },
            url: `${UrlApi}/catalogs/GetLineDocumentById`,
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
            url: `${UrlApi}/catalogs/DeleteDocumentById`,
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
//#endregion
//#region Controllers
const initButtons = async () => {
    try {
        $('#ActionsButtons').append(`
                <button id="AddOrUpdateTransportLineModalButton" type="button" title="Registrar Linea de Transporte" 
                    class="btn rounded-pill btn-icon btn-outline-primary" 
                    data-bs-toggle="tooltip" data-bs-placement="top">
                    <span class="tf-icons bx bx-plus"></span>
                </button>
            `);

        $('#AddOrUpdateTransportLineModalButton').click(async function () {
            await AddOrUpdateTransportLineModal();
        });
        $('#AddOrUpdateTransportLineButton').click(async function () {
            await AddOrUpdateTransportLineButton()
        });
        $('#AddOrUpdateLineDocumentButton').click(async function () {
            await AddOrUpdateLineDocumentButton()
        });
        $('#DocumentsNavButton').on('shown.bs.tab', async function (e) {
            let TransportLineId = sessionStorage.getItem("TransportLineId");
            let TemporalDocumentId = sessionStorage.getItem("TemporalDocumentId");
            await TransportLineDocumentsDataTable(TransportLineId, TemporalDocumentId);
        });

        $('#LineDocument').on('change', function () {
            const LineDocument = $(this)[0];
            const LineDocumentFile = LineDocument.files[0];

            if (LineDocumentFile) {
                $('#LineDocument').attr('style', '');
            } else {
                $('#LineDocument').attr('style', 'color: transparent');
            }
        });

         style="color: transparent"

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
const FillSelectDocumentLine = async () => {
    try {
        const data = await GetTransportLineDocuments();

        var $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.Name);
            $options = $options.add($option);
        });

        $('#DocumentLineSelect').empty();
        $('#DocumentLineSelect').append($options);
    } catch (error) {
        console.error(error);
    }
};
const AddOrUpdateTransportLineModal = async (e) => {
    try {
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
        $('#DocumentLineSelect').val(0);
        $('#LineDocument').val("");
        $('#AddOrUpdateTransportLineModal').modal('show');
        $('#DocumentsModalNavs button:first').tab('show');
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
const AddOrUpdateLineDocumentButton = async () => {
    try {
        const TransportLineId = sessionStorage.getItem("TransportLineId");
        const LineDocument = $('#LineDocument')[0];
        const LineDocumentFile = LineDocument.files[0];

        const TransportLineDocument = {
            userId: sessionStorage.getItem('userId'),
            TemporalDocumentId: sessionStorage.getItem('TemporalDocumentId'),
            TransportLineId: TransportLineId,
            LineDocumentFile: LineDocumentFile,
            DocumentId: $('#DocumentLineSelect').val()
        };

        const response = await AddOrUpdateLineDocument(TransportLineDocument);

        if (response.success) {
            await ToastsNotification("Líneas de Transporte", "Se subio el archivo con exito.", "Primary", "Top right");
            $('#LineDocument').val("").trigger('change');
        } else {
            await ToastsNotification("Líneas de Transporte", response.message, "Danger", "Middle center");
        };

        TemporalDocumentId = response.TemporalDocumentId;

        sessionStorage.setItem('TemporalDocumentId', TemporalDocumentId);

        TransportLineDocumentsDataTable(TransportLineId, TemporalDocumentId);

    } catch (error) {
        console.error(error);
    }
};
const GetLineDocumentButton = async () => {
};
const TransportLineDocumentsDataTable = async (TransportLineId, TemporalDocumentId) => {
    try {
        if ($.fn.DataTable.isDataTable('#TransportLineDocuments')) {
            $('#TransportLineDocuments').DataTable().destroy();
            $('#TransportLineDocuments').html('');
        };

        const data = await GetLineDocument(TransportLineId, TemporalDocumentId);
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
                                        id="DonwloadLineDocument"
                                        data='${JSON.stringify(row)}'
                                        title='Descargar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='DonwloadLineDocument(this);'
                                    >
                                        <span class="tf-icons bx bxs-download"></span>
                                    </button>
                                    <button
                                        class="btn rounded-pill btn-icon btn-outline-danger" 
                                        type="button" 
                                        id="AddOrUpdateTransportLineTableButton"
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
            $('#TransportLineDocuments').DataTable({
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
const DonwloadLineDocument = async (e) => {
    if (e) {
        const data = $(e).attr('data');
        const dataObj = JSON.parse(data);
        const DocumentId = dataObj.Id;

        GetLineDocumentById(DocumentId);
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
            TransportLineDocumentsDataTable(TransportLineId, TemporalDocumentId);
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