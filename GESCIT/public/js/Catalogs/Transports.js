let permissions;
$.blockUI.defaults.baseZ = 4000;

$(document).ready(async function () {
    await ValidatePath();
    permissions = await GetRolesActionsByUserIdModuleId();
    createMenu();

    sessionStorage.setItem("TransportId", 0);
    sessionStorage.setItem("TemporalDocumentId", 0);
    await initButtons();
    await TransportsDataTable(true);
    await FillSelectTransportType();
    await FillSelectDocumentList();

    tooltipTrigger();
});

const initButtons = async () => {
    try {
        if (permissions.CREAR) {
            $('#ActionsButtons').append(`
                <button id="AddOrUpdateTransportModalButton" type="button" title="Registrar Transporte" 
                    class="btn rounded-pill btn-icon btn-outline-primary" 
                    data-bs-toggle="tooltip" data-bs-placement="top">
                    <span class="tf-icons bx bx-plus"></span>
                </button>
            `);
        };

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

        $('#AddOrUpdateTransportModal').on('hidden.bs.modal', function () {
            const TransportId = sessionStorage.getItem("TransportId");
            const DocumentType = "Transporte";
            NotDeleteDocuments(TransportId, DocumentType);
        });

        $('#TransportDocumentSelect').on('change', function () {
            $('#TransportDocument').val("").trigger('change');
        });

        permissions?.Documentos?.Ver ? $('#DocumentsNavButton').show() : $('#DocumentsNavButton').hide();
        permissions?.Documentos?.Crear ? $('#divCreateDocument').show() : $('#divCreateDocument').hide();
    } catch (error) {
        console.error(error);
    }
};

const TransportsDataTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#TransportTable')) {
            $('#TransportTable').DataTable().destroy();
            $('#TransportTable').empty();
        };

        const userId = sessionStorage.getItem('userId');
        const data = await GetTransports(userId);
        if (data?.length > 0) {
            const columns = [
                {
                    title: 'Acciones',
                    data: 'Id',
                    render: function (data, type, row) {
                        return permissions.EDITAR ? `
                            <button 
                                class="btn rounded-pill btn-icon btn-outline-primary"
                                type="button" 
                                data='${JSON.stringify(row)}'
                                title='Editar'
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                action='AddOrUpdateTransportModal'>
                                    <span class="tf-icons bx bx-edit-alt"></span>
                            </button>` : '';
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
                    url: '../js/datatable-esp.json'
                },
                columnDefs: [
                    { "type": "num", "targets": 5 }
                ]
            }).on('draw', function () {
                $('[data-bs-toggle="tooltip"]').tooltip();
                $('button[action="AddOrUpdateTransportModal"]').click(function () {
                    AddOrUpdateTransportModal(this);
                });
            });
        };
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

        ToastsNotification("Transportes", response.message, toastType, toastPlacement);
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
            ToastsNotification("Transportes", "Tamaño máximo permitido: 10 MB", "Danger", "Middle center");
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

        if (!response?.success) {
            ToastsNotification("Transportes", response.message, "Danger", "Middle center");
            return;
        };

        const TemporalDocumentId = response.TemporalDocumentId;
        sessionStorage.setItem('TemporalDocumentId', TemporalDocumentId);
        ToastsNotification("Transportes", "Se subió el archivo con éxito.", "Primary", "Top right");
        $('#TransportDocument').val("").trigger('change');
        await TransportDocumentsDataTable(TransportId, TemporalDocumentId);

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
        const data = await GetTransportDocument(DocumentType, TransportId, TemporalDocumentId) || [];
        const dtColumns = ['Fecha', 'Tipo de Documento', 'Nombre', 'Estatus'];
        const columns = [
            {
                title: 'Acciones',
                data: 'Id',
                render: function (data, type, row) {
                    let buttons = ``;
                    buttons = `
                        <button 
                            class="btn rounded-pill btn-icon btn-outline-primary" 
                            type="button"
                            data='${JSON.stringify(row)}'
                            title='Descargar'
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            action='DownloadTransportDocument'>
                            <span class="tf-icons bx bxs-download"></span>
                        </button>`;

                    if (permissions?.Documentos?.Eliminar && row.Estatus != "Aprobado") {
                        buttons += `
                            <button 
                                class="btn rounded-pill btn-icon btn-outline-danger"
                                type="button" 
                                data='${JSON.stringify(row)}'
                                title='Eliminar'
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                action='DeleteDocument'>
                                    <span class="tf-icons bx bx-trash"></span>
                            </button>`;
                    };

                    return buttons;
                },
                width: "20%"
            }
        ];

        dtColumns.forEach(column => {
            columns.push({
                title: column,
                data: column
            });
        });

        $('#TransportDocumentDataTable').DataTable({
            data: data,
            columns: columns,
            language: {
                url: '../js/datatable-esp.json'
            },
            columnDefs: [{
                defaultContent: "",
                targets: "_all"
            }]
        }).on('draw', async function () {
            tooltipTrigger();
            $('button[action="DownloadTransportDocument"]').off().click(async function () {
                await DownloadTransportDocument(this);
            });
            $('button[action="DeleteDocument"]').off().click(async function () {
                await DeleteDocument(this);
            });
        });
    } catch (error) {
        console.error(error);
    };
};

const DownloadTransportDocument = async (e) => {
    if (e) {
        const data = $(e).attr('data');
        const dataObj = JSON.parse(data);
        const DocumentId = dataObj.Id;

        await GetTransportDocumentById(DocumentId);
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
            await TransportDocumentsDataTable(TransportId, TemporalDocumentId);
        } else {
            toastType = 'Danger';
            toastPlacement = 'Middle center';
        };

        ToastsNotification("Líneas de Transporte", response.message, toastType, toastPlacement);

    } catch (error) {
        console.error(error);
    }
};