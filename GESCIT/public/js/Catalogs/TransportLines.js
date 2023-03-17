$(document).ready(async function () {
    await initModule.initButtons();
    await initModule.TransportLinesDataTable(true);
    await initModule.FillSelectTransportLineType();
    await initModule.FillSelectDocumentLine();

    await tooltipTrigger();
});

const fetchs = {
    GetTransportLines: async (userId) => {
        try {
            const response = await $.ajax({
                url: 'http://localhost:8090/GescitApi/catalogs/getTransportLines', type: 'POST', data: {
                    userId
                }, // Enviar userId en el cuerpo de la solicitud
                dataType: 'json'
            });
            return response.success ? response.data : console.log(response.message);
        } catch (error) {
            console.error(error);
        }
    },
    GetTransportLineType: async () => {
        try {
            const response = await $.ajax({ url: 'http://localhost:8090/GescitApi/catalogs/getTransportLineTypes', type: 'GET', dataType: 'json' });
            return response.success ? response.data : console.log(response.message);
        } catch (error) {
            console.error(error);
        }
    },
    GetTransportLineDocuments: async () => {
        try {
            const response = await $.ajax({ url: 'http://localhost:8090/GescitApi/catalogs/getTransportLineDocuments', type: 'GET', dataType: 'json' });
            return response.success ? response.data : console.log(response.message);
        } catch (error) {
            console.error(error);
        }
    },
    AddOrUpdateTransportLine: async (TransportLine) => {
        try {
            const response = await $.ajax({
                url: 'http://localhost:8090/GescitApi/catalogs/addOrUpdateTransportLine',
                type: 'POST',
                data: {
                    TransportLine
                }, // Enviar TransportLine en el cuerpo de la solicitud
                dataType: 'json'
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    },
    AddOrUpdateLineDocument: async (TransportLineDocument) => {
        try {
            let formData = new FormData();
            // formData.append('userId', TransportLineDocument.userId);
            // formData.append('TransportLineId', TransportLineDocument.TransportLineId);
            formData.append('image', TransportLineDocument.LineDocumentFile);

            const response = await $.ajax({
                url: 'http://localhost:8090/GescitApi/catalogs/upload',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}

const initModule = {
    initButtons: async () => {
        try {
            $('#ActionsButtons').append(`
                <button id="AddOrUpdateTransportLineModalButton" type="button" title="Registrar" 
                    class="btn rounded-pill btn-icon btn-outline-primary" 
                    data-bs-toggle="tooltip" data-bs-placement="top">
                    <span class="tf-icons bx bx-plus"></span>
                </button>
            `);

            $('#AddOrUpdateTransportLineModalButton').click(function () {
                initModule.AddOrUpdateTransportLineModal();
            });
            $('#AddOrUpdateTransportLineButton').click(function () {
                initModule.AddOrUpdateTransportLineButton()
            });
            $('#AddOrUpdateLineDocumentButton').click(function () {
                initModule.AddOrUpdateLineDocumentButton()
            });
            $('#AddOrUpdateLineDocumentButton2').click(function () {
                initModule.AddOrUpdateLineDocumentButton2()
            });

        } catch (error) {
            console.error(error);
        }
    },
    TransportLinesDataTable: async () => {
        try {
            if ($.fn.DataTable.isDataTable('#TransportLineTable')) {
                $('#TransportLineTable').DataTable().destroy();
            }

            const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
            const data = await fetchs.GetTransportLines(userId);
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
                                        onclick='initModule.AddOrUpdateTransportLineModal(this);'
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
    },
    FillSelectTransportLineType: async () => {
        try {
            const data = await fetchs.GetTransportLineType();

            var $options = $();
            const $SeleccionaUnaOpcion = $('<option>').attr('value', 0).text("Selecciona una opcion");
            $options = $options.add($SeleccionaUnaOpcion);
            data.forEach(function (value) {
                const $option = $('<option>').attr('value', value.Id).text(value.Type);
                $options = $options.add($option);
            });

            $('#TransportLineTypeSelect').empty();
            $('#TransportLineTypeSelect').append($options);
        } catch (error) {
            console.error(error);
        }
    },
    FillSelectDocumentLine: async () => {
        try {
            const data = await fetchs.GetTransportLineDocuments();

            var $options = $();
            const $SeleccionaUnaOpcion = $('<option>').attr('value', 0).text("Selecciona una opcion");
            $options = $options.add($SeleccionaUnaOpcion);
            data.forEach(function (value) {
                const $option = $('<option>').attr('value', value.Id).text(value.Name);
                $options = $options.add($option);
            });

            $('#DocumentLineSelect').empty();
            $('#DocumentLineSelect').append($options);
        } catch (error) {
            console.error(error);
        }
    },
    AddOrUpdateTransportLineModal: async (e) => {
        try {
            if (e) {
                const TransportLine = $(e).attr('data');
                const TransportLineObj = JSON.parse(TransportLine);

                sessionStorage.setItem("TransportLineId", TransportLineObj.Id);
                $('#TransportLineTypeSelect').val(TransportLineObj.LineTypeId);
                $('#LineName').val(TransportLineObj['Linea de Transporte']);
            } else {
                sessionStorage.setItem("TransportLineId", 0);
                $('#TransportLineTypeSelect').val(0);
                $('#LineName').val("");
                $('#Capacity').val("");
            };
            // $('#AddOrUpdateTransportLineModal').modal('show');
            $('#AddOrUpdateTransportLineModal').modal('show');
        } catch (error) {
            console.error(error);
        }
    },
    AddOrUpdateLineDocumentButton: async () => {
        try {
            const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
            const TransportLineId = sessionStorage.getItem("TransportLineId");
            const LineDocument = $('#LineDocument')[0];// Obtener el elemento de entrada de archivo usando su ID
            const LineDocumentFile = LineDocument.files[0];// Obtener el archivo seleccionado

            const TransportLineDocument = {
                userId,
                TransportLineId,
                LineDocumentFile
            };

            const response = await fetchs.AddOrUpdateLineDocument(TransportLineDocument);


            console.log(response);

            // let toastType = "Primary";
            // let toastPlacement = "Top right";
            // if (response.success) {
            //     $('#AddOrUpdateTransportLineModal').modal('hide');
            // } else {
            //     toastType = "Danger";
            //     toastPlacement = "Middle center";
            // };

            // await ToastsNotification("TransportLinees", response.message, toastType, toastPlacement);
            // await initModule.TransportLinesDataTable(false);

        } catch (error) {
            console.error(error);
        }
    },
    AddOrUpdateLineDocumentButton2: async () => {
        await $.ajax({
            url: 'http://localhost:8090/GescitApi/catalogs/download',
            method: 'GET',
            xhrFields: {
                responseType: 'blob' // Indica que la respuesta es un archivo binario
            },
            success: function(data) {
                // Crear un objeto URL a partir de los datos recibidos:
                var url = URL.createObjectURL(data);
                
                // Crear un enlace de descarga en el navegador:
                var link = document.createElement('a');
                link.href = url;
                link.download = "nombre-del-archivo.pdf"; 
                
                // Hacer clic en el enlace para descargar el archivo:
                link.click();
                
                // Liberar el objeto URL:
                URL.revokeObjectURL(url);
            },
            error: function(error) {
                console.log(error);
            }
        });
    },
}
