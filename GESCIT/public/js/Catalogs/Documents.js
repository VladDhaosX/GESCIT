const UrlApi = window.__env.UrlApi;
let permissions;
$.blockUI.defaults.baseZ = 4000;

$(document).ready(async function () {
    await ValidatePath();
    permissions = await GetRolesActionsByUserIdModuleId();
    await createMenu();

    sessionStorage.setItem("CLientId", 0);
    sessionStorage.setItem("TemporalDocumentId", 0);

    await initButtons();
    await EmptyTable();

});

const GetDocumentsByClient = async (AccountNum, Status, DocumentType) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            }
            , complete: function () {
                $.unblockUI();
            }
            , url: `${UrlApi}/catalogs/GetDocumentsByClient`
            , type: 'POST'
            , dataType: 'json'
            , data: {
                AccountNum: AccountNum,
                Status: Status,
                DocumentType: DocumentType
            }
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const GetClientsUnreviewed = async () => {
    try {
        const Status = "unreviewed";
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/GetClientsByStatusDocs`, type: 'POST', data: {
                Status
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const GetClientsApproved = async () => {
    try {
        const Status = "approved";
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/GetClientsByStatusDocs`, type: 'POST', data: {
                Status
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const GetClientsEmpty = async () => {
    try {
        const Status = "empty";
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/GetClientsByStatusDocs`, type: 'POST', data: {
                Status
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const GetDocumentById = (DocumentId) => {
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

const UpdateDocumentStatus = async (DocumentFileId, NewStatus) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            }
            , complete: function () {
                $.unblockUI();
            }
            , url: `${UrlApi}/catalogs/UpdateDocumentStatus`
            , type: 'POST'
            , dataType: 'json'
            , data: {
                DocumentFileId: DocumentFileId,
                NewStatus: NewStatus
            }
        });
        return response;

    } catch (error) {
        console.error(error);
    }
};

const UnreviewedTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#pendingTable')) {
            $('#pendingTable').DataTable().destroy();
            var div = document.getElementById('pendingTable');
            div.innerHTML = "";
        }

        const data = await GetClientsUnreviewed() || [];
        const columns = [
            {
                title: 'Ver',
                data: 'AccountNum',
                "render": function (data, type, row) {
                    return `
                            <button 
                                class="btn btn-primary dropdown-toggle" 
                                type="button" 
                                data='${JSON.stringify(row)}'
                                title='Documentos'
                                data-bs-toggle="dropdown"
                                data-bs-placement="top"
                            >
                                <span class="tf-icons bx bx-file"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <button class="dropdown-item" 
                                    action='TransportLinesDocumentsModal'
                                    data='${JSON.stringify(row)}'
                                    >
                                    Linea Transportista</button>
                                </li>
                                <li>
                                    <button class="dropdown-item" 
                                    action='DriversDocumentsModal'
                                    data='${JSON.stringify(row)}'
                                    >
                                    Chofer</button></li>
                                <li>
                                    <button class="dropdown-item" 
                                    action='TransportsDocumentsModal'
                                    data='${JSON.stringify(row)}'
                                    >
                                    Transporte</button></li>
                            </ul>
                        `
                }
            },
            ...Object.keys(data[0]).map(propName => ({
                title: propName,
                data: propName,
                visible: !propName.includes('Id'),

            }))
        ];
        $('#pendingTable').DataTable({
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
            $('button[action="TransportLinesDocumentsModal"]').off('click').on('click', async function () {
                await TransportLinesDocumentsModal(this, "unreviewed");
            });
            $('button[action="DriversDocumentsModal"]').off('click').on('click', async function () {
                await DriversDocumentsModal(this, "unreviewed");
            });
            $('button[action="TransportsDocumentsModal"]').off('click').on('click', async function () {
                await TransportsDocumentsModal(this, "unreviewed");
            });
        });

    } catch (error) {
        console.error(error);
    }
};

const ApprovedTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#approvedTable')) {
            $('#approvedTable').DataTable().destroy();
            var div = document.getElementById('approvedTable');
            div.innerHTML = "";
        }

        const data = await GetClientsApproved();
        if (data.length > 0) {
            // Crea el arreglo de objetos para las columnas del DataTable
            const columns = [
                {
                    title: 'Ver',
                    data: 'AccountNum',
                    "render": function (data, type, row) {
                        return `
                                    <button 
                                        class="btn btn-primary dropdown-toggle" 
                                        type="button" 
                                        data='${JSON.stringify(row)}'
                                        title='Documentos'
                                        data-bs-toggle="dropdown"
                                        data-bs-placement="top"
                                    >
                                        <span class="tf-icons bx bx-file"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <button class="dropdown-item" 
                                            action='TransportLinesDocumentsModal'
                                            data='${JSON.stringify(row)}'
                                            >
                                            Linea Transportista</button>
                                        </li>
                                        <li>
                                            <button class="dropdown-item" 
                                            action='DriversDocumentsModal'
                                            data='${JSON.stringify(row)}'
                                            >
                                            Chofer</button></li>
                                        <li>
                                            <button class="dropdown-item" 
                                            action='TransportsDocumentsModal'
                                            data='${JSON.stringify(row)}'
                                            >
                                            Transporte</button></li>
                                    </ul>
                                `
                    }
                },
                ...Object.keys(data[0]).map(propName => ({
                    title: propName,
                    data: propName,
                    visible: !propName.includes('Id'),

                }))
            ];
            $('#approvedTable').DataTable({
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

                $('button[action="TransportLinesDocumentsModal"]').off('click').on('click', async function () {
                    await TransportLinesDocumentsModal(this, "approved");
                });
                $('button[action="DriversDocumentsModal"]').off('click').on('click', async function () {
                    await DriversDocumentsModal(this, "approved");
                });
                $('button[action="TransportsDocumentsModal"]').off('click').on('click', async function () {
                    await TransportsDocumentsModal(this, "approved");
                });
            });
        };
    } catch (error) {
        console.error(error);
    }
};

const EmptyTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#emptyTable')) {
            $('#emptyTable').DataTable().destroy();
            var div = document.getElementById('emptyTable');
            div.innerHTML = "";
        }

        const data = await GetClientsEmpty();
        if (data.length > 0) {
            // Crea el arreglo de objetos para las columnas del DataTable
            const columns = [
                {
                    title: 'Ver',
                    data: 'AccountNum',
                    "render": function (data, type, row) {
                        return `
                            <button 
                                class="btn btn-primary dropdown-toggle" 
                                type="button" 
                                data='${JSON.stringify(row)}'
                                title='Documentos'
                                data-bs-toggle="dropdown"
                                data-bs-placement="top"
                            >
                                <span class="tf-icons bx bx-file"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <button class="dropdown-item"
                                    action='TransportLinesDocumentsModal'
                                    data='${JSON.stringify(row)}'
                                    >
                                    Linea Transportista</button>
                                </li>
                            </ul>
                        `;
                    }
                },
                ...Object.keys(data[0]).map(propName => ({
                    title: propName,
                    data: propName,
                    visible: !propName.includes('Id'),

                }))
            ];
            $('#emptyTable').DataTable({
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

                $('button[action="TransportLinesDocumentsModal"]').off('click').on('click', async function () {
                    await TransportLinesDocumentsModal(this, "empty");
                });
            });
        };
    } catch (error) {
        console.error(error);
    }
};

const UnreviewedTransportLinesTable = async (AccountNum) => {
    try {
        if ($.fn.DataTable.isDataTable('#DocumentsTable')) {
            $('#DocumentsTable').DataTable().destroy();
            var div = document.getElementById('DocumentsTable');
            div.innerHTML = "";
        };

        const data = await GetDocumentsByClient(AccountNum, "unreviewed", "Linea Transportista") || [];
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
                            title='Descargar'
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            action='DownloadDocument'
                        >
                            <span class="tf-icons bx bx-download"></span>
                        </button>
                        <button 
                            class="btn rounded-pill btn-icon btn-outline-primary"
                            type="button" 
                            data='${JSON.stringify(row)}'
                            title='Aprobar'
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            action='ApproveDocument'
                        >
                            <span class="tf-icons bx bx-check"></span>
                        </button>
                        <button 
                            class="btn rounded-pill btn-icon btn-outline-primary"
                            type="button" 
                            data='${JSON.stringify(row)}'
                            title='Rechazar'
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            action='RejectDocument'
                        >
                            <span class="tf-icons bx bx-x">
                        </button>
                    ` : '';
                }
            },
            ...Object.keys(data[0]).map(propName => ({
                title: propName,
                data: propName,
                visible: !propName.includes('Id'),

            }))
        ];
        $('#DocumentsTable').DataTable({
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
            $('button[action="DownloadDocument"]').off('click').on('click', async function () {
                await DownloadDocument(this);
            });
            $('button[action="ApproveDocument"]').off('click').on('click', async function () {
                await ApproveDocument(this);
            });
            $('button[action="RejectDocument"]').off('click').on('click', async function () {
                await RejectDocument(this);
            });
        });
    } catch (error) {
        console.error(error);
    };
};

const UnreviewedDriversTable = async (AccountNum) => {
    try {
        if ($.fn.DataTable.isDataTable('#DocumentsTable')) {
            $('#DocumentsTable').DataTable().destroy();
            var div = document.getElementById('DocumentsTable');
            div.innerHTML = "";
        };

        const data = await GetDocumentsByClient(AccountNum, "unreviewed", "Chofer") || [];
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
                            title='Descargar'
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            action='DownloadDocument'
                        >
                            <span class="tf-icons bx bx-download"></span>
                        </button>
                        <button 
                            class="btn rounded-pill btn-icon btn-outline-primary"
                            type="button" 
                            data='${JSON.stringify(row)}'
                            title='Aprobar'
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            action='ApproveDocument'
                        >
                            <span class="tf-icons bx bx-check"></span>
                        </button>
                        <button 
                            class="btn rounded-pill btn-icon btn-outline-primary"
                            type="button" 
                            data='${JSON.stringify(row)}'
                            title='Rechazar'
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            action='RejectDocument'
                        >
                            <span class="tf-icons bx bx-x">
                        </button>
                    ` : '';
                }
            },
            ...Object.keys(data[0]).map(propName => ({
                title: propName,
                data: propName,
                visible: !propName.includes('Id'),

            }))
        ];
        $('#DocumentsTable').DataTable({
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
            $('button[action="DownloadDocument"]').off('click').on('click', async function () {
                await DownloadDocument(this);
            });
            $('button[action="ApproveDocument"]').off('click').on('click', async function () {
                await ApproveDocument(this);
            });
            $('button[action="RejectDocument"]').off('click').on('click', async function () {
                await RejectDocument(this);
            });
        });
    } catch (error) {
        console.error(error);
    };
}

const UnreviewedTransportsTable = async (AccountNum) => {
    try {
        if ($.fn.DataTable.isDataTable('#DocumentsTable')) {
            $('#DocumentsTable').DataTable().destroy();
            var div = document.getElementById('DocumentsTable');
            div.innerHTML = "";
        };

        const data = await GetDocumentsByClient(AccountNum, "unreviewed", "Transporte") || [];
        const columns = [
            {
                title: 'Acciones',
                data: 'Id',
                "render": function (data, type, row) {
                    return permissions.EDITAR ? `
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary"
                                        type="button" 
                                        data='${JSON.stringify(row)}'
                                        title='Descargar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        action='DownloadDocument'
                                    >
                                        <span class="tf-icons bx bx-download"></span>
                                    </button>
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary"
                                        type="button" 
                                        data='${JSON.stringify(row)}'
                                        title='Aprobar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        action='ApproveDocument'
                                    >
                                        <span class="tf-icons bx bx-check"></span>
                                    </button>
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary"
                                        type="button" 
                                        data='${JSON.stringify(row)}'
                                        title='Rechazar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        action='RejectDocument'
                                    >
                                        <span class="tf-icons bx bx-x">
                                    </button>
                                ` : '';
                }
            },
            ...Object.keys(data[0]).map(propName => ({
                title: propName,
                data: propName,
                visible: !propName.includes('Id'),

            }))
        ];

        $('#DocumentsTable').DataTable({
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
            $('button[action="DownloadDocument"]').off('click').on('click', async function () {
                await DownloadDocument(this);
            });
            $('button[action="ApproveDocument"]').off('click').on('click', async function () {
                await ApproveDocument(this);
            });
            $('button[action="RejectDocument"]').off('click').on('click', async function () {
                await RejectDocument(this);
            });
        });
    } catch (error) {
        console.error(error);
    };
}

const ApprovedTransportLinesTable = async (AccountNum) => {
    try {
        if ($.fn.DataTable.isDataTable('#DocumentsTable')) {
            $('#DocumentsTable').DataTable().destroy();
            var div = document.getElementById('DocumentsTable');
            div.innerHTML = "";
        }

        const data = await GetDocumentsByClient(AccountNum, "approved", "Linea Transportista");
        if (data.length > 0) {
            // Crea el arreglo de objetos para las columnas del DataTable
            const columns = [
                {
                    title: 'Acciones',
                    data: 'Id',
                    "render": function (data, type, row) {
                        return permissions.EDITAR ? `
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary"
                                        type="button" 
                                        id="DownloadDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Descargar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='DownloadDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-download"></span>
                                    </button>
                                ` : '';
                    }
                },
                ...Object.keys(data[0]).map(propName => ({
                    title: propName,
                    data: propName,
                    visible: !propName.includes('Id'),

                }))
            ];
            $('#DocumentsTable').DataTable({
                data: data,
                columns: columns,
                language: {
                    url: '../js/datatable-esp.json'
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

const EmptyTransportLineTable = async (AccountNum) => {
    try {
        if ($.fn.DataTable.isDataTable('#DocumentsTable')) {
            $('#DocumentsTable').DataTable().destroy();
            var div = document.getElementById('DocumentsTable');
            div.innerHTML = "";
        }

        const data = await GetDocumentsByClient(AccountNum, "empty", "Linea Transportista");
        if (data.length > 0) {
            // Crea el arreglo de objetos para las columnas del DataTable
            const columns = [
                ...Object.keys(data[0]).map(propName => ({
                    title: propName,
                    data: propName,
                    visible: !propName.includes('Id'),

                }))
            ];
            $('#DocumentsTable').DataTable({
                data: data,
                columns: columns,
                language: {
                    url: '../js/datatable-esp.json'
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

const ApprovedDriversTable = async (AccountNum) => {
    try {
        if ($.fn.DataTable.isDataTable('#DocumentsTable')) {
            $('#DocumentsTable').DataTable().destroy();
            var div = document.getElementById('DocumentsTable');
            div.innerHTML = "";
        }

        const data = await GetDocumentsByClient(AccountNum, "approved", "Chofer");
        if (data.length > 0) {
            // Crea el arreglo de objetos para las columnas del DataTable
            const columns = [
                {
                    title: 'Acciones',
                    data: 'Id',
                    "render": function (data, type, row) {
                        return permissions.EDITAR ? `
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary"
                                        type="button" 
                                        id="DownloadDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Descargar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='DownloadDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-download"></span>
                                    </button>
                                ` : '';
                    }
                },
                ...Object.keys(data[0]).map(propName => ({
                    title: propName,
                    data: propName,
                    visible: !propName.includes('Id'),

                }))
            ];
            $('#DocumentsTable').DataTable({
                data: data,
                columns: columns,
                language: {
                    url: '../js/datatable-esp.json'
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

const ApprovedTransportsTable = async (AccountNum) => {
    try {
        if ($.fn.DataTable.isDataTable('#DocumentsTable')) {
            $('#DocumentsTable').DataTable().destroy();
            var div = document.getElementById('DocumentsTable');
            div.innerHTML = "";
        }

        const data = await GetDocumentsByClient(AccountNum, "approved", "Transporte");
        if (data.length > 0) {
            // Crea el arreglo de objetos para las columnas del DataTable
            const columns = [
                {
                    title: 'Acciones',
                    data: 'Id',
                    "render": function (data, type, row) {
                        return permissions.EDITAR ? `
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary"
                                        type="button" 
                                        id="DownloadDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Descargar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='DownloadDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-download"></span>
                                    </button>
                                ` : '';
                    }
                },
                ...Object.keys(data[0]).map(propName => ({
                    title: propName,
                    data: propName,
                    visible: !propName.includes('Id'),

                }))
            ];
            $('#DocumentsTable').DataTable({
                data: data,
                columns: columns,
                language: {
                    url: '../js/datatable-esp.json'
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

const TransportLinesDocumentsModal = async (e, Status) => {
    try {
        const Client = $(e).attr('data');
        const ClientObj = JSON.parse(Client);
        const DocumentType = 'Linea Transportista';
        const Cliente = ClientObj?.Cliente || 0;

        const data = await GetDocumentsByClient(Cliente, Status, DocumentType) || [];

        sessionStorage.setItem("AccountNum", Cliente);
        sessionStorage.setItem("DocumentType", DocumentType);
        sessionStorage.setItem("Status", Status);

        if (data?.length <= 0) {
            const toastType = 'Danger';
            const toastPlacement = 'Top right';
            ToastsNotification("No Existen Documentos", "El apartado que está intentando consultar se encuentra vacío.", toastType, toastPlacement);
            return;
        };

        $('#Documents').modal('show');
    } catch (error) {
        console.error(error);
    }
};

const DriversDocumentsModal = async (e, Status) => {
    try {
        console.log(e);
        console.log(Status);
        const DocumentType = 'Chofer';
        let Cliente = 0;
        const Client = $(e).attr('data');
        const ClientObj = JSON.parse(Client);

        Cliente = ClientObj.Cliente;

        const data = await GetDocumentsByClient(Cliente, Status, DocumentType);

        sessionStorage.setItem("AccountNum", Cliente);
        sessionStorage.setItem("DocumentType", DocumentType);
        sessionStorage.setItem("Status", Status);

        if (data?.length <= 0) {
            toastType = 'Danger';
            toastPlacement = 'Top right';
            ToastsNotification("No Existen Documentos", "El apartado que está intentando consultar se encuentra vacío.", toastType, toastPlacement);
            return;
        };

        $('#Documents').modal('show');

    } catch (error) {
        console.error(error);
    }
};

const TransportsDocumentsModal = async (e, Status) => {
    try {
        const DocumentType = 'Transporte';
        let Cliente = 0;
        const Client = $(e).attr('data');
        const ClientObj = JSON.parse(Client);


        Cliente = ClientObj.Cliente;

        const data = await GetDocumentsByClient(Cliente, Status, DocumentType);

        sessionStorage.setItem("AccountNum", Cliente);
        sessionStorage.setItem("DocumentType", DocumentType);
        sessionStorage.setItem("Status", Status);

        if (data.length > 0) {
            $('#Documents').modal('show');
        }
        else {
            toastType = 'Danger';
            toastPlacement = 'Top right';
            ToastsNotification("No Existen Documentos", "El apartado que está intentando consultar se encuentra vacío.", toastType, toastPlacement);
        }

    } catch (error) {
        console.error(error);
    }
};

const DownloadDocument = async (e) => {
    if (e) {
        const data = $(e).attr('data');
        const dataObj = JSON.parse(data);
        const DocumentId = dataObj.Id;

        GetDocumentById(DocumentId);
    }
};

const ApproveDocument = async (e) => {
    if (e) {
        const data = $(e).attr('data');
        const dataObj = JSON.parse(data);
        const DocumentFileId = dataObj.Id;
        const AccountNum = sessionStorage.getItem('AccountNum');
        let toastType = '';
        let toastPlacement = '';
        const response = await UpdateDocumentStatus(DocumentFileId, 'approved');

        if (response.Success) {
            const DocumentType = sessionStorage.getItem('DocumentType');
            toastType = 'Primary';
            toastPlacement = 'Top right';
            ToastsNotification("Documento Aprobado", "El documento ha sido aprobado correctamente.", toastType, toastPlacement);
            if (DocumentType == 'Chofer') {
                await UnreviewedDriversTable(AccountNum);
            }
            else if (DocumentType == 'Linea Transportista') {
                await UnreviewedTransportLinesTable(AccountNum);
            }
            else if (DocumentType == 'Transporte') {
                await UnreviewedTransportsTable(AccountNum);
            }
        }
        else {
            toastType = 'Danger';
            toastPlacement = 'Top right';
            ToastsNotification("Falla en Aprobación", "El documento no pudo ser actualizado (400).", toastType, toastPlacement);
        }
    }
};

const RejectDocument = async (e) => {
    if (!e) {
        toastType = 'Danger';
        toastPlacement = 'Top right';
        ToastsNotification("Falla en Rechazo", "El documento no pudo ser actualizado (400).", toastType, toastPlacement);
        return;
    };

    const data = $(e).attr('data');
    const dataObj = JSON.parse(data);
    const DocumentFileId = dataObj.Id;
    const AccountNum = sessionStorage.getItem('AccountNum');

    const response = await UpdateDocumentStatus(DocumentFileId, 'rejected');

    if (response?.Success) {
        const DocumentType = sessionStorage.getItem('DocumentType');
        const toastType = 'Primary';
        const toastPlacement = 'Top right';
        ToastsNotification("Documento Rechazado", "El documento ha sido rechazado correctamente.", toastType, toastPlacement);

        if (DocumentType == 'Chofer') {
            await UnreviewedDriversTable(AccountNum);
        }
        else if (DocumentType == 'Linea Transportista') {
            await UnreviewedTransportLinesTable(AccountNum);
        }
        else if (DocumentType == 'Transporte') {
            await UnreviewedTransportsTable(AccountNum);
        };
    };
};

const initButtons = async () => {
    try {

        $('#ApprovedTabButton').on('shown.bs.tab', async function () {
            await ApprovedTable();
        });

        $('#EmptyTabButton').on('shown.bs.tab', async function () {
            await EmptyTable();
        });

        //PendingTabButton
        $('#PendingTabButton').on('shown.bs.tab', async function () {
            await UnreviewedTable();
        });

        $('#Documents').on('shown.bs.modal', async function () {
            let AccountNum = sessionStorage.getItem('AccountNum');
            let DocumentType = sessionStorage.getItem('DocumentType');
            let Status = sessionStorage.getItem('Status');

            if (DocumentType == 'Chofer') {
                if (Status == 'approved') {
                    await ApprovedDriversTable(AccountNum);
                }
                else if (Status == 'unreviewed') {
                    await UnreviewedDriversTable(AccountNum);
                }
            }
            else if (DocumentType == 'Transporte') {
                if (Status == 'approved') {
                    await ApprovedTransportsTable(AccountNum);
                }
                else if (Status == 'unreviewed') {
                    await UnreviewedTransportsTable(AccountNum);
                }
            }
            else if (DocumentType == 'Linea Transportista') {
                if (Status == 'approved') {
                    await ApprovedTransportLinesTable(AccountNum);
                }
                else if (Status == 'unreviewed') {
                    await UnreviewedTransportLinesTable(AccountNum);
                }
                else if (Status == 'empty') {
                    await EmptyTransportLineTable(AccountNum);
                };
            }
            else {
                console.log("No se encontró el tipo de documento pedido.")
            }
        });

        $('#Documents').on('hidden.bs.modal', async function () {
            // get active tab
            let activeTab = $('.nav-link.active').attr('id');
            if (activeTab == 'PendingTabButton') {
                await UnreviewedTable();
            } else if (activeTab == 'ApprovedTabButton') {
                await ApprovedTable();
            } else if (activeTab == 'EmptyTabButton') {
                await EmptyTable();
            };
        });

    } catch (error) {
        console.error(error);
    }
};