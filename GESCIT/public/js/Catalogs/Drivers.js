let permissions;
$.blockUI.defaults.baseZ = 4000;

$(document).ready(async function () {
    await ValidatePath();
    permissions = await GetRolesActionsByUserIdModuleId();
    await createMenu();

    sessionStorage.setItem("DriverId", 0);
    sessionStorage.setItem("TemporalDocumentId", 0);

    await initButtons();
    await DriversDataTable(true);
    await FillSelectDocumentList();
    tooltipTrigger();
});

const initButtons = async () => {
    try {

        if (permissions.CREAR) {
            $('#ActionsButtons').append(`
                <button id="AddOrUpdateDriverModalButton" type="button" title="Registrar Chofer" 
                    class="btn rounded-pill btn-icon btn-outline-primary" 
                    data-bs-toggle="tooltip" data-bs-placement="top">
                    <span class="tf-icons bx bx-plus"></span>
                </button>
            `);
        };

        $('#AddOrUpdateDriverModalButton').click(async function () {
            await AddOrUpdateDriverModal();
        });
        $('#AddOrUpdateDriverButton').click(async function () {
            await AddOrUpdateDriverButton()
        });
        $('#AddOrUpdateDriverDocumentButton').click(async function () {
            await AddOrUpdateDriverDocumentButton()
        });
        $('#DocumentsNavButton').on('shown.bs.tab', async function () {
            let DriverId = sessionStorage.getItem("DriverId");
            let TemporalDocumentId = sessionStorage.getItem("TemporalDocumentId");
            await DriverDocumentsDataTable(DriverId, TemporalDocumentId);
        });

        $('#DriverDocument').on('change', function () {
            const LineDocument = $(this)[0];
            const LineDocumentFile = LineDocument.files[0];

            if (LineDocumentFile) {
                $('#DriverDocument').attr('style', '');
            } else {
                $('#DriverDocument').attr('style', 'color: transparent');
            }
        });

        $('#AddOrUpdateDriverModal').on('hidden.bs.modal', function () {
            let DriverId = sessionStorage.getItem("DriverId");
            const DocumentType = "Chofer";
            NotDeleteDocuments(DriverId, DocumentType);
        });

        $('#DocumentDriverSelect').on('change', function () {
            $('#DriverDocument').val("").trigger('change');
        });

        permissions?.Documentos?.Ver ? $('#DocumentsNavButton').show() : $('#DocumentsNavButton').hide();
        permissions?.Documentos?.Crear ? $('#divCreateDocument').show() : $('#divCreateDocument').hide();

    } catch (error) {
        console.error(error);
    }
};

const DriversDataTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#DriversTable')) {
            $('#DriversTable').DataTable().destroy();
        };

        const userId = sessionStorage.getItem('userId');
        const data = await GetDrivers(userId) || [];
        const columns = [
            {
                title: 'Acciones',
                data: 'Id',
                render: function (data, type, row) {
                    return permissions.EDITAR ? `
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary" 
                                        type="button" 
                                        id="AddOrUpdateDriversTableButton"
                                        data='${JSON.stringify(row)}'
                                        title='Editar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        action='AddOrUpdateDriverModal'
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
        $('#DriversTable').DataTable({
            data: data,
            columns: columns,
            language: {
                url: '../js/datatable-esp.json'
            },
            columnDefs: [{
                className: 'bolded',
                targets: 6,
                defaultContent: "",
                targets: "_all"
            }]
        }).on('draw', async function () {
            tooltipTrigger();
            $('button[action="AddOrUpdateDriverModal"]').off().on('click', async function () {
                await AddOrUpdateDriverModal(this);
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const FillSelectDocumentList = async () => {
    try {
        const DocumentType = "Chofer"
        const data = await GetDocumentsList(DocumentType);

        var $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.Name);
            $options = $options.add($option);
        });

        $('#DocumentDriverSelect').empty();
        $('#DocumentDriverSelect').append($options);
    } catch (error) {
        console.error(error);
    }
};

const AddOrUpdateDriverModal = async (e) => {
    try {
        let DriverId = 0;
        let TemporalDocumentId = 0;
        if (e) {
            const Driver = $(e).attr('data');
            const DriverObj = JSON.parse(Driver);

            DriverId = DriverObj.Id;
            sessionStorage.setItem("DriverId", DriverId);

            $('#FirstName').val(DriverObj.Nombre);
            $('#LastName').val(DriverObj.Apellido);
            $('#SecondLastName').val(DriverObj['Apellido materno']);
            $('#PhoneNumber').val(DriverObj.Telefono);

        } else {
            sessionStorage.setItem("DriverId", DriverId);
            sessionStorage.setItem("TemporalDocumentId", TemporalDocumentId);

            $('#FirstName').val("");
            $('#LastName').val("");
            $('#SecondLastName').val("");
            $('#PhoneNumber').val("");
        };
        $('#DocumentDriverSelect').val(0);
        $('#DriverDocument').val("");
        $('#AddOrUpdateDriverModal').modal('show');
        $('#DocumentsModalNavs button:first').tab('show');
    } catch (error) {
        console.error(error);
    }
};

const AddOrUpdateDriverButton = async () => {
    try {
        let DriverId = sessionStorage.getItem("DriverId");
        let TemporalDocumentId = sessionStorage.getItem("TemporalDocumentId");
        const UserId = sessionStorage.getItem("userId");
        const FirstName = $('#FirstName').val();
        const LastName = $('#LastName').val();
        const SecondLastName = $('#SecondLastName').val();
        const PhoneNumber = $('#PhoneNumber').val();

        const Driver = {
            DriverId: DriverId,
            TemporalDocumentId: TemporalDocumentId,
            UserId: UserId,
            FirstName: FirstName,
            LastName: LastName,
            SecondLastName: SecondLastName,
            PhoneNumber: PhoneNumber
        };

        const response = await AddOrUpdateDriver(Driver);
        let toastType = 'Primary';
        let toastPlacement = 'Top right';

        if (response.success) {
            DriverId = response.DriverId;
            sessionStorage.setItem("DriverId", DriverId);
            DriversDataTable();
            $('#AddOrUpdateDriverModal').modal('hide');
        } else {
            toastType = 'Danger';
            toastPlacement = 'Middle center';
        };

        ToastsNotification("Choferes", response.message, toastType, toastPlacement);

    } catch (error) {
        console.error(error);
    }
};

const AddOrUpdateDriverDocumentButton = async () => {
    try {
        const DriverId = sessionStorage.getItem("DriverId");
        const DriverDocumentInput = $('#DriverDocument')[0];
        const DriverDocumentFile = DriverDocumentInput.files[0];

        if (DriverDocumentFile.size > 10485760) {
            ToastsNotification("Choferes", "Tamaño máximo permitido: 10 MB", "Danger", "Middle center");
            return;
        };

        const DriverDocument = {
            userId: sessionStorage.getItem('userId'),
            TemporalDocumentId: sessionStorage.getItem('TemporalDocumentId'),
            DriverId: DriverId,
            DriverDocumentFile: DriverDocumentFile,
            DocumentId: $('#DocumentDriverSelect').val()
        };

        const response = await AddOrUpdateDriverDocument(DriverDocument);

        if (!response?.success) {
            ToastsNotification("Chofer", response.message, "Danger", "Middle center");
            return;
        };

        const TemporalDocumentId = response.TemporalDocumentId;
        sessionStorage.setItem('TemporalDocumentId', TemporalDocumentId);
        ToastsNotification("Chofer", "Se subió el archivo con éxito.", "Primary", "Top right");
        $('#DocumentDriverSelect').val(0).trigger('change');
        $('#DriverDocument').val("").trigger('change');
        await DriverDocumentsDataTable(DriverId, TemporalDocumentId);

    } catch (error) {
        console.error(error);
    }
};

const DriverDocumentsDataTable = async (DriverId, TemporalDocumentId) => {
    try {
        if ($.fn.DataTable.isDataTable('#DriverDocuments')) {
            $('#DriverDocuments').DataTable().destroy();
            $('#DriverDocuments').html('');
        };

        const DocumentType = "Chofer";
        const data = await GetDriverDocument(DocumentType, DriverId, TemporalDocumentId);
        if (data.length > 0) {
            const columns = [
                {
                    title: 'Acciones',
                    data: 'Id',
                    render: function (data, type, row) {
                        let buttons = `
                        <button 
                            class="btn rounded-pill btn-icon btn-outline-primary" 
                            type="button" 
                            data='${JSON.stringify(row)}'
                            title='Descargar'
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            action='DownloadDriverDocument'
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
            $('#DriverDocuments').DataTable({
                data: data,
                columns: columns,
                language: {
                    url: '../js/datatable-esp.json'
                },
                columnDefs: [{
                    className: 'bolded',
                    targets: 6,
                    defaultContent: "",
                    targets: "_all"
                }]
            }).on('draw', async function () {
                tooltipTrigger();
                $('button[action="DownloadDriverDocument"]').off().on('click', async function () {
                    await DownloadDriverDocument(this);
                });
                $('button[action="DeleteDocument"]').off().on('click', async function () {
                    await DeleteDocument(this);
                });
            });
        }
    } catch (error) {
        console.error(error);
    };
};

const DownloadDriverDocument = async (e) => {
    if (e) {
        const data = $(e).attr('data');
        const dataObj = JSON.parse(data);
        const DocumentId = dataObj.Id;

        await GetDriverDocumentById(DocumentId);
    }
};

const DeleteDocument = async (e) => {
    try {
        const DriverId = sessionStorage.getItem('DriverId');
        const TemporalDocumentId = sessionStorage.getItem('TemporalDocumentId');
        let data = $(e).attr('data');
        let dataObj = JSON.parse(data);
        let DocumentId = dataObj.Id;

        const response = await DeleteDocumentById(DocumentId);
        let toastType = 'Primary';
        let toastPlacement = 'Top right';

        if (response.success) {
            await DriverDocumentsDataTable(DriverId, TemporalDocumentId);
        } else {
            toastType = 'Danger';
            toastPlacement = 'Middle center';
        };

        ToastsNotification("Chofer", response.message, toastType, toastPlacement);

    } catch (error) {
        console.error(error);
    }
}