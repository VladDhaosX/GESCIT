const UrlApi = window.__env.UrlApi;

$(document).ready(async function () {
    sessionStorage.setItem("DriverId", 0);
    sessionStorage.setItem("TemporalDocumentId", 0);

    await initButtons();
    await DriversDataTable(true);
    await FillSelectDocumentLine();
    await tooltipTrigger();

});

//#region fetchs 
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

const GetDriversDocuments = async () => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            }, url: `${UrlApi}/catalogs/GetDriversDocuments`, type: 'GET', dataType: 'json'
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
const GetDriverDocument = async (DriverId, TemporalDocumentId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/GetDriverDocument`, type: 'POST', data: {
                DriverId, TemporalDocumentId
            }, // Enviar userId en el cuerpo de la solicitud
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
    }
};
const AddOrUpdateDriverDocument = async (DriverDocument) => {
    try {
        let formData = new FormData();

        formData.append('userId', DriverDocument.userId);
        formData.append('TemporalDocumentId', DriverDocument.TemporalDocumentId);
        formData.append('DriverId', DriverDocument.DriverId);
        formData.append('image', DriverDocument.DriverDocumentFile);
        formData.append('DocumentId', DriverDocument.DocumentId);

        const response = await $.ajax({
            beforeSend: async function (xhr) {
                await $.blockUI({ message: null });
            },
            complete: async function () {
                await $.unblockUI();
            },
            url: `${UrlApi}/catalogs/AddOrUpdateDriverDocument`,
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
            url: `${UrlApi}/catalogs/GetDriverDocumentById`,
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
}
//#endregion
//#region Controsllers
const initButtons = async () => {
    try {
        $('#ActionsButtons').append(`
                <button id="AddOrUpdateDriverModalButton" type="button" title="Registrar" 
                    class="btn rounded-pill btn-icon btn-outline-primary" 
                    data-bs-toggle="tooltip" data-bs-placement="top">
                    <span class="tf-icons bx bx-plus"></span>
                </button>
            `);

        $('#AddOrUpdateDriverModalButton').click(async function () {
            await AddOrUpdateDriverModal();
        });
        $('#AddOrUpdateDriverButton').click(async function () {
            await AddOrUpdateDriverButton()
        });
        $('#AddOrUpdateDriverDocumentButton').click(async function () {
            await AddOrUpdateDriverDocumentButton()
        });
        $('#DocumentsNavButton').on('shown.bs.tab', async function (e) {
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

    } catch (error) {
        console.error(error);
    }
};

const DriversDataTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#DriversTable')) {
            $('#DriversTable').DataTable().destroy();
        }

        const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
        const data = await GetDrivers(userId);
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
                                        id="AddOrUpdateDriversTableButton"
                                        data='${JSON.stringify(row)}'
                                        title='Editar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='AddOrUpdateDriverModal(this);'
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
            $('#DriversTable').DataTable({
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

const FillSelectDocumentLine = async () => {
    try {
        const data = await GetDriversDocuments();

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

        await ToastsNotification("Choferes", response.message, toastType, toastPlacement);

    } catch (error) {
        console.error(error);
    }
};

const AddOrUpdateDriverDocumentButton = async () => {
    try {
        const DriverId = sessionStorage.getItem("DriverId");
        const DriverDocumentInput = $('#DriverDocument')[0];
        const DriverDocumentFile = DriverDocumentInput.files[0];

        const DriverDocument = {
            userId: sessionStorage.getItem('userId'),
            TemporalDocumentId: sessionStorage.getItem('TemporalDocumentId'),
            DriverId: DriverId,
            DriverDocumentFile: DriverDocumentFile,
            DocumentId: $('#DocumentDriverSelect').val()
        };

        const response = await AddOrUpdateDriverDocument(DriverDocument);

        if (response.success) {
            await ToastsNotification("Chofer", "Se subio el archivo con exito.", "Primary", "Top right");
        } else {
            await ToastsNotification("Chofer", response.message, "Danger", "Middle center");
        };

        TemporalDocumentId = response.TemporalDocumentId;

        sessionStorage.setItem('TemporalDocumentId', TemporalDocumentId);

        DriverDocumentsDataTable(DriverId, TemporalDocumentId);

    } catch (error) {
        console.error(error);
    }
};

const GetDriverDocumentButton = async () => {
};

const DriverDocumentsDataTable = async (DriverId, TemporalDocumentId) => {
    try {
        if ($.fn.DataTable.isDataTable('#DriverDocuments')) {
            $('#DriverDocuments').DataTable().destroy();
            $('#DriverDocuments').html('');
        };

        const data = await GetDriverDocument(DriverId, TemporalDocumentId);
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
                                        id="DonwloadDriverDocument"
                                        data='${JSON.stringify(row)}'
                                        title='Descargar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='DonwloadDriverDocument(this);'
                                    >
                                        <span class="tf-icons bx bxs-download"></span>
                                    </button>
                                    <button
                                        class="btn rounded-pill btn-icon btn-outline-danger" 
                                        type="button" 
                                        id="AddOrUpdateDriversTableButton"
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
            $('#DriverDocuments').DataTable({
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

const DonwloadDriverDocument = async (e) => {
    if (e) {
        const data = $(e).attr('data');
        const dataObj = JSON.parse(data);
        const DocumentId = dataObj.Id;

        GetDriverDocumentById(DocumentId);
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
            DriverDocumentsDataTable(DriverId, TemporalDocumentId);
        } else {
            toastType = 'Danger';
            toastPlacement = 'Middle center';
        };

        await ToastsNotification("Chofer", response.message, toastType, toastPlacement);

    } catch (error) {
        console.error(error);
    }
}
//#endregion