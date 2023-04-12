const UrlApi = window.__env.UrlApi;

$(document).ready(async function () {
    sessionStorage.setItem("CLientId", 0);
    sessionStorage.setItem("TemporalDocumentId", 0);

    await UnreviewedTable();
    await ApprovedTable();

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

const UpdateDocumentStatus = async (DocumentFileId, NewStatus) =>{
    try{
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
                NewStatus: NewStatus,
            }
        });
        return response;

    } catch(error){
        console.error(error);
    }
};

const UnreviewedTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#pendingTable')) {
            $('#pendingTable').DataTable().destroy();
        }

        const data = await GetClientsUnreviewed();
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
                                        id="ViewDocumentDropdown"
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
                                            onclick= 'TransportLinesDocumentsModal(this, "unreviewed")';
                                            data='${JSON.stringify(row)}'
                                            >
                                            Linea Transportista</button>
                                        </li>
                                        <li>
                                            <button class="dropdown-item" 
                                            onclick= 'DriversDocumentsModal(this, "unreviewed")';
                                            data='${JSON.stringify(row)}'
                                            >
                                            Chofer</button></li>
                                        <li>
                                            <button class="dropdown-item" 
                                            onclick= 'TransportsDocumentsModal(this, "unreviewed")';
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
                    url: './js/datatable-esp.json'
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const ApprovedTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#approvedTable')) {
            $('#approvedTable').DataTable().destroy();
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
                                        id="ViewDocumentDropdown"
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
                                            onclick= 'TransportLinesDocumentsModal(this, "approved")';
                                            data='${JSON.stringify(row)}'
                                            >
                                            Linea Transportista</button>
                                        </li>
                                        <li>
                                            <button class="dropdown-item" 
                                            onclick= 'DriversDocumentsModal(this, "approved")';
                                            data='${JSON.stringify(row)}'
                                            >
                                            Chofer</button></li>
                                        <li>
                                            <button class="dropdown-item" 
                                            onclick= 'TransportsDocumentsModal(this, "approved")';
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
                    url: './js/datatable-esp.json'
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const UnreviewedTransportLinesTable = async (AccountNum) => {
    try {
        if ($.fn.DataTable.isDataTable('#DocumentsTable')) {
            $('#DocumentsTable').DataTable().destroy();
        }

        const data = await GetDocumentsByClient(AccountNum, "unreviewed", "Linea Transportista");
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
                                        id="DownloadDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Descargar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='DownloadDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-download"></span>
                                    </button>
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary"
                                        type="button" 
                                        id="ApproveDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Aprobar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='ApproveDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-check"></span>
                                    </button>
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary"
                                        type="button" 
                                        id="RejectDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Rechazar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='RejectDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-x">
                                    </button>
                                `
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
                    url: './js/datatable-esp.json'
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

const UnreviewedDriversTable = async (AccountNum) => {
    try {
        if ($.fn.DataTable.isDataTable('#DocumentsTable')) {
            $('#DocumentsTable').DataTable().destroy();
        }

        const data = await GetDocumentsByClient(AccountNum, "unreviewed", "Chofer");
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
                                        id="DownloadDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Descargar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='DownloadDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-download"></span>
                                    </button>
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary"
                                        type="button" 
                                        id="ApproveDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Aprobar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='ApproveDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-check"></span>
                                    </button>
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary"
                                        type="button" 
                                        id="RejectDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Rechazar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='RejectDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-x">
                                    </button>
                                `
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
                    url: './js/datatable-esp.json'
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

const UnreviewedTransportsTable = async (AccountNum) => {
    try {
        if ($.fn.DataTable.isDataTable('#DocumentsTable')) {
            $('#DocumentsTable').DataTable().destroy();
        }

        const data = await GetDocumentsByClient(AccountNum, "unreviewed", "Transporte");
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
                                        id="DownloadDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Descargar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='DownloadDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-download"></span>
                                    </button>
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary"
                                        type="button" 
                                        id="ApproveDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Aprobar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='ApproveDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-check"></span>
                                    </button>
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary"
                                        type="button" 
                                        id="RejectDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Rechazar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='RejectDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-x">
                                    </button>
                                `
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
                    url: './js/datatable-esp.json'
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

const ApprovedTransportLinesTable = async (AccountNum) => {
    try {
        if ($.fn.DataTable.isDataTable('#DocumentsTable')) {
            $('#DocumentsTable').DataTable().destroy();
        }

        const data = await GetDocumentsByClient(AccountNum, "approved", "Linea Transportista");
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
                                        id="DownloadDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Descargar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='DownloadDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-download"></span>
                                    </button>
                                    
                                `
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
                    url: './js/datatable-esp.json'
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
        }

        const data = await GetDocumentsByClient(AccountNum, "approved", "Chofer");
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
                                        id="DownloadDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Descargar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='DownloadDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-download"></span>
                                    </button>
                                    
                                `
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
                    url: './js/datatable-esp.json'
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
        }

        const data = await GetDocumentsByClient(AccountNum, "approved", "Transporte");
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
                                        id="DownloadDocumentButton"
                                        data='${JSON.stringify(row)}'
                                        title='Descargar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='DownloadDocument(this);'
                                    >
                                        <span class="tf-icons bx bx-download"></span>
                                    </button>
                                    
                                `
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
                    url: './js/datatable-esp.json'
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
        if(Status=='unreviewed'){
            await UnreviewedTransportLinesTable(ClientObj.Cliente);
            $('#Documents').modal('show');
        }
        else if(Status='approved'){
            await ApprovedTransportLinesTable(ClientObj.Cliente);
            $('#Documents').modal('show');
        }

    } catch (error) {
        console.error(error);
    }
};

const DriversDocumentsModal = async (e, Status) => {
    try {
        const Client = $(e).attr('data');
        const ClientObj = JSON.parse(Client);
        if(Status=='unreviewed'){
            await UnreviewedDriversTable(ClientObj.Cliente);
            $('#Documents').modal('show');
        }
        else if(Status='approved'){
            await ApprovedDriversTable(ClientObj.Cliente);
            $('#Documents').modal('show');
        }
    } catch (error) {
        console.error(error);
    }
};

const TransportsDocumentsModal = async (e, Status) => {
    try {
        const Client = $(e).attr('data');
        const ClientObj = JSON.parse(Client);
        if(Status=='unreviewed'){
            await UnreviewedTransportsTable(ClientObj.Cliente);
            $('#Documents').modal('show');
        }
        else if(Status='approved'){
            await ApprovedTransportsTable(ClientObj.Cliente);
            $('#Documents').modal('show');
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

const ApproveDocument = async (e)=>{
    if (e) {
        const data = $(e).attr('data');
        const dataObj = JSON.parse(data);
        const DocumentFileId = dataObj.DocumentFileId;

        UpdateDocumentStatus(DocumentFileId, 'approved');
    }
}

const RejectDocument = async (e)=>{
    if (e) {
        const data = $(e).attr('data');
        const dataObj = JSON.parse(data);
        const DocumentFileId = dataObj.DocumentFileId;

        UpdateDocumentStatus(DocumentFileId, 'rejected');
    }
}