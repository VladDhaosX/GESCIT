
$(document).ready(async function () {
    sessionStorage.setItem("DriverId", 0);
    sessionStorage.setItem("TemporalDocumentId", 0);

    await initModule.initButtons();
    await initModule.DriversDataTable(true);
    await initModule.FillSelectDocumentLine();
    await tooltipTrigger();

});


const fetchs = {
    GetDrivers: async (UserId) => {
        try {
            const response = await $.ajax({
                async: true,
                beforeSend: function () {
                    $.blockUI({ message: null });
                },
                complete: function () {
                    $.unblockUI();
                },
                url: 'http://localhost:8090/GescitApi/catalogs/GetDrivers', type: 'POST', data: {
                    UserId
                }, // Enviar userId en el cuerpo de la solicitud
                dataType: 'json'
            });
            return response.success ? response.data : console.log(response.message);
        } catch (error) {
            console.error(error);
        }
    },
    GetDriversDocuments: async () => {
        try {
            const response = await $.ajax({
                async: true,
                beforeSend: function () {
                    $.blockUI({ message: null });
                },
                complete: function () {
                    $.unblockUI();
                }, url: 'http://localhost:8090/GescitApi/catalogs/GetDriversDocuments', type: 'GET', dataType: 'json' });
            return response.success ? response.data : console.log(response.message);
        } catch (error) {
            console.error(error);
        }
    },
    AddOrUpdateDriver: async (Driver) => {
        try {
            const response = await $.ajax({
                async: true,
                beforeSend: function () {
                    $.blockUI({ message: null });
                },
                complete: function () {
                    $.unblockUI();
                },
                url: 'http://localhost:8090/GescitApi/catalogs/addOrUpdateDriver',
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
    },
    GetDriverDocument: async (DriverId, TemporalDocumentId) => {
        try {
            const response = await $.ajax({
                async: true,
                beforeSend: function () {
                    $.blockUI({ message: null });
                },
                complete: function () {
                    $.unblockUI();
                },
                url: 'http://localhost:8090/GescitApi/catalogs/GetDriverDocument', type: 'POST', data: {
                    DriverId, TemporalDocumentId
                }, // Enviar userId en el cuerpo de la solicitud
                dataType: 'json'
            });
            return response.success ? response.data : console.log(response.message);
        } catch (error) {
            console.error(error);
        }
    },
    AddOrUpdateDriverDocument: async (DriverDocument) => {
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
                url: 'http://localhost:8090/GescitApi/catalogs/AddOrUpdateDriverDocument',
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
    },
    GetDriverDocumentById: (DocumentId) => {
        try {
            $.ajax({
                beforeSend: async function (xhr) {
                    await $.blockUI({ message: null }); 
                },
                complete: async function () {
                    await $.unblockUI();
                },
                url: 'http://localhost:8090/GescitApi/catalogs/GetDriverDocumentById',
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
    },
    DeleteDocumentById: async (DocumentId) => {
        try {
            return await $.ajax({
                beforeSend: async function (xhr) {
                    await $.blockUI({ message: null }); 
                },
                complete: async function () {
                    await $.unblockUI();
                },
                url: 'http://localhost:8090/GescitApi/catalogs/DeleteDocumentById',
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
}

const initModule = {
    initButtons: async () => {
        try {
            $('#ActionsButtons').append(`
                <button id="AddOrUpdateDriverModalButton" type="button" title="Registrar" 
                    class="btn rounded-pill btn-icon btn-outline-primary" 
                    data-bs-toggle="tooltip" data-bs-placement="top">
                    <span class="tf-icons bx bx-plus"></span>
                </button>
            `);

            $('#AddOrUpdateDriverModalButton').click(async function () {
                await initModule.AddOrUpdateDriverModal();
            });
            $('#AddOrUpdateDriverButton').click(async function () {
                await initModule.AddOrUpdateDriverButton()
            });
            $('#AddOrUpdateDriverDocumentButton').click(async function () {
                await initModule.AddOrUpdateDriverDocumentButton()
            });
            $('#DocumentsNavButton').on('shown.bs.tab', async function (e) {
                let DriverId = sessionStorage.getItem("DriverId");
                let TemporalDocumentId = sessionStorage.getItem("TemporalDocumentId");
                await initModule.DriverDocumentsDataTable(DriverId, TemporalDocumentId);
            });

        } catch (error) {
            console.error(error);
        }
    },
    DriversDataTable: async () => {
        try {
            if ($.fn.DataTable.isDataTable('#DriversTable')) {
                $('#DriversTable').DataTable().destroy();
            }

            const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
            const data = await fetchs.GetDrivers(userId);
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
                                        onclick='initModule.AddOrUpdateDriverModal(this);'
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
    },
    FillSelectDocumentLine: async () => {
        try {
            const data = await fetchs.GetDriversDocuments();

            var $options = $();
            const $SeleccionaUnaOpcion = $('<option>').attr('value', 0).text("Selecciona una opcion");
            $options = $options.add($SeleccionaUnaOpcion);
            data.forEach(function (value) {
                const $option = $('<option>').attr('value', value.Id).text(value.Name);
                $options = $options.add($option);
            });

            $('#DocumentDriverSelect').empty();
            $('#DocumentDriverSelect').append($options);
        } catch (error) {
            console.error(error);
        }
    },
    AddOrUpdateDriverModal: async (e) => {
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
                const dateString = DriverObj['Fecha de Nacimiento']; // "19/03/2023"
                const dateComponents = dateString.split('/'); // ["19", "03", "2023"]
                const formattedDate = `${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`; // "2023-03-19"

                $('#Birthdate').val(formattedDate);

            } else {
                sessionStorage.setItem("DriverId", DriverId);
                sessionStorage.setItem("TemporalDocumentId", TemporalDocumentId);

                $('#FirstName').val("");
                $('#LastName').val("");
                $('#SecondLastName').val("");
                $('#PhoneNumber').val("");
                $('#Birthdate').val("");
            };
            $('#DocumentDriverSelect').val(0);
            $('#DriverDocument').val("");
            $('#AddOrUpdateDriverModal').modal('show');
            $('#DocumentsModalNavs button:first').tab('show');
        } catch (error) {
            console.error(error);
        }
    },
    AddOrUpdateDriverButton: async () => {
        try {
            let DriverId = sessionStorage.getItem("DriverId");
            let TemporalDocumentId = sessionStorage.getItem("TemporalDocumentId");
            const UserId = sessionStorage.getItem("userId");
            const FirstName = $('#FirstName').val();
            const LastName = $('#LastName').val();
            const SecondLastName = $('#SecondLastName').val();
            const PhoneNumber = $('#PhoneNumber').val();
            const Birthdate = $('#Birthdate').val();

            if (!Birthdate) {
                return await ToastsNotification("Choferes", "Es necesario seleccionar una fecha de nacimiento.", 'Danger', 'Middle center');
            };

            const Driver = {
                DriverId: DriverId,
                TemporalDocumentId: TemporalDocumentId,
                UserId: UserId,
                FirstName: FirstName,
                LastName: LastName,
                SecondLastName: SecondLastName,
                PhoneNumber: PhoneNumber,
                Birthdate: Birthdate
            };

            const response = await fetchs.AddOrUpdateDriver(Driver);
            let toastType = 'Primary';
            let toastPlacement = 'Top right';

            if (response.success) {
                DriverId = response.DriverId;
                sessionStorage.setItem("DriverId", DriverId);
                initModule.DriversDataTable();
                $('#AddOrUpdateDriverModal').modal('hide');
            } else {
                toastType = 'Danger';
                toastPlacement = 'Middle center';
            };

            await ToastsNotification("Choferes", response.message, toastType, toastPlacement);

        } catch (error) {
            console.error(error);
        }
    },
    AddOrUpdateDriverDocumentButton: async () => {
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

            const response = await fetchs.AddOrUpdateDriverDocument(DriverDocument);

            if (response.success) {
                await ToastsNotification("Chofer", "Se subio el archivo con exito.", "Primary", "Top right");
            } else {
                await ToastsNotification("Chofer", response.message, "Danger", "Middle center");
            };

            TemporalDocumentId = response.TemporalDocumentId;

            sessionStorage.setItem('TemporalDocumentId', TemporalDocumentId);

            initModule.DriverDocumentsDataTable(DriverId, TemporalDocumentId);

        } catch (error) {
            console.error(error);
        }
    },
    GetDriverDocumentButton: async () => {
    },
    DriverDocumentsDataTable: async (DriverId, TemporalDocumentId) => {
        try {
            if ($.fn.DataTable.isDataTable('#DriverDocuments')) {
                $('#DriverDocuments').DataTable().destroy();
                $('#DriverDocuments').html('');
            };

            const data = await fetchs.GetDriverDocument(DriverId, TemporalDocumentId);
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
                                        onclick='initModule.DonwloadDriverDocument(this);'
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
                                        onclick='initModule.DeleteDocument(this);'
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
    },
    DonwloadDriverDocument: async (e) => {
        if (e) {
            const data = $(e).attr('data');
            const dataObj = JSON.parse(data);
            const DocumentId = dataObj.Id;

            fetchs.GetDriverDocumentById(DocumentId);
        }
    },
    DeleteDocument: async (e) => {
        try {
            const DriverId = sessionStorage.getItem('DriverId');
            const TemporalDocumentId = sessionStorage.getItem('TemporalDocumentId');
            let data = $(e).attr('data');
            let dataObj = JSON.parse(data);
            let DocumentId = dataObj.Id;

            const response = await fetchs.DeleteDocumentById(DocumentId);
            let toastType = 'Primary';
            let toastPlacement = 'Top right';

            if (response.success) {
                initModule.DriverDocumentsDataTable(DriverId, TemporalDocumentId);
            } else {
                toastType = 'Danger';
                toastPlacement = 'Middle center';
            };

            await ToastsNotification("Chofer", response.message, toastType, toastPlacement);

        } catch (error) {
            console.error(error);
        }
    }
}