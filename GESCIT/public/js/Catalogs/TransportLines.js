let permissions;
$.blockUI.defaults.baseZ = 4000;

$(document).ready(async function () {
    await ValidatePath();
    permissions = await GetRolesActionsByUserIdModuleId();
    createMenu();

    sessionStorage.setItem("TransportLineId", 0);
    sessionStorage.setItem("TemporalDocumentId", 0);

    await initButtons();
    await TransportLinesDataTable(true);
    await FillSelectTransportLineType();
    await FillSelectDocumentList();

    tooltipTrigger();
});

const initButtons = async () => {
    try {
        if (permissions.CREAR) {
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

        $('#AddOrUpdateTransportModal').on('hidden.bs.modal', function () {
            const TransportLineId = sessionStorage.getItem("TransportLineId");
            const DocumentType = "Transporte";
            NotDeleteDocuments(TransportLineId, DocumentType);
        });

        $('#TransportDocumentSelect').on('change', function () {
            $('#TransportDocument').val("").trigger('change');
        });

        $('#myModal').on('hidden.bs.modal', function (e) {
        })

        permissions?.Documentos?.Ver ? $('#DocumentsNavButton').show() : $('#DocumentsNavButton').hide();
        permissions?.Documentos?.Crear ? $('#divCreateDocument').show() : $('#divCreateDocument').hide();

    } catch (error) {
        console.error(error);
    }
};

const TransportLinesDataTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#TransportLineTable')) {
            $('#TransportLineTable').DataTable().destroy();
        }

        const userId = sessionStorage.getItem('userId');
        const data = await GetTransportLines(userId) || [];
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
                                action='AddOrUpdateTransportLineModal'
                            >
                                <span class="tf-icons bx bx-edit-alt"></span>
                            </button>
                        ` : '';
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
                url: '../js/datatable-esp.json'
            },
            columnDefs: [{
                defaultContent: "",
                targets: "_all"
            }]
        }).on('draw', async function () {
            tooltipTrigger();
            $('button[action="AddOrUpdateTransportLineModal"]').off().on('click', async function () {
                await AddOrUpdateTransportLineModal(this);
            });
        });
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
        const TransportLine = JSON.parse($(e).attr('data') || '{}');
        const TransportLineId = TransportLine.Id || 0;
        const userRolKey = sessionStorage.getItem('userRolKey');
        sessionStorage.setItem("TransportLineId", TransportLineId);

        userRolKey == 'Cliente' ? $('#DocumentsNavButton').hide() : $('#DocumentsNavButton').show();

        $('#TransportLineTypeSelect').val(TransportLine.LineTypeId || 0);
        $('#LineName').val(TransportLine['Línea de Transporte'] || "");
        $('#DocumentLineSelect').val(0);
        $('#LineDocument').val("");
        $('#TransportDocumentSelect').val(0);

        $('#DocumentsModalNavs button:first').tab('show');
        $('#AddOrUpdateTransportLineModal').modal('show');
    } catch (error) {
        console.error(error);
    };
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

        ToastsNotification("Líneas de Transporte", response.message, toastType, toastPlacement);

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
            ToastsNotification("Transportes", "Tamaño máximo permitido: 10 MB", "Danger", "Middle center");
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
            ToastsNotification("Transportes", "Se subio el archivo con exito.", "Primary", "Top right");
            $('#TransportDocument').val("").trigger('change');
            $('#TransportDocumentSelect').val(0);
        } else {
            ToastsNotification("Transportes", response.message, "Danger", "Middle center");
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
        const data = await GetTransportDocument(DocumentType, TransportLineId, TemporalDocumentId) || [];
        const columns = [
            {
                title: 'Acciones',
                data: 'Id',
                "render": function (data, type, row) {
                    let buttons = ``;
                    buttons += `
                        <button 
                            class="btn rounded-pill btn-icon btn-outline-primary" 
                            type="button" 
                            data='${JSON.stringify(row)}'
                            title='Descargar'
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            action='DownloadTransportDocument'
                        >
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
                                action='DeleteDocument'
                            >
                                <span class="tf-icons bx bx-trash"></span>
                            </button>
                        `;
                    }
                    return buttons;
                },
                width: "20%"
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
                url: '../js/datatable-esp.json'
            },
            columnDefs: [{
                defaultContent: "",
                targets: "_all"
            }]
        }).on('draw', async function () {
            tooltipTrigger();
            $('button[action="DownloadTransportDocument"]').off().on('click', async function () {
                await DownloadTransportDocument(this);
            });
            $('button[action="DeleteDocument"]').off().on('click', async function () {
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

        ToastsNotification("Líneas de Transporte", response.message, toastType, toastPlacement);

    } catch (error) {
        console.error(error);
    }
};