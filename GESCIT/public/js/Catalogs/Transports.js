$(document).ready(async function () {
    await initModule.initButtons();
    await initModule.TransportsDataTable();
    await initModule.FillSelectTransportType();

    await tooltipTrigger();
});

const fetchs = {
    GetTransports: async (userId) => {
        try {
            const response = await $.ajax({
                url: 'http://localhost:8090/GescitApi/catalogs/getTransports', type: 'POST', data: {
                    userId
                }, // Enviar userId en el cuerpo de la solicitud
                dataType: 'json'
            });
            return response.success ? response.data : console.log(response.message);
        } catch (error) {
            console.error(error);
        }
    },
    GetTransportType: async () => {
        try {
            const response = await $.ajax({url: 'http://localhost:8090/GescitApi/catalogs/getTransportType', type: 'GET', dataType: 'json'});
            return response.success ? response.data : console.log(response.message);
        } catch (error) {
            console.error(error);
        }
    },
    AddOrUpdateTransport: async (Transport) => {
        try {
            const response = await $.ajax({
                url: 'http://localhost:8090/GescitApi/catalogs/addOrUpdateTransport', type: 'POST', data: {
                    Transport
                }, // Enviar Transport en el cuerpo de la solicitud
                dataType: 'json'
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
            <button id="AddOrUpdateTransportModalButton" type="button" title="Registrar transporte" 
                class="btn rounded-pill btn-icon btn-outline-primary" 
                data-bs-toggle="tooltip" data-bs-placement="top">
                <span class="tf-icons bx bx-plus"></span>
            </button>
        `);

            $('#AddOrUpdateTransportModalButton').click(function () {
                initModule.AddOrUpdateTransportModal();
            });
            $('#AddOrUpdateTransportButton').click(function () {
                initModule.AddOrUpdateTransportButton()
            });

        } catch (error) {
            console.error(error);
        }
    },
    TransportsDataTable: async () => {
        try {
            const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
            let data = await fetchs.GetTransports(userId);

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
                            data='${
                            JSON.stringify(row)
                        }'
                            title='Editar'
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            onclick='initModule.AddOrUpdateTransportModal(this);'
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
                })),
            ];

            $('#TransportTable').DataTable({
                data: data,
                "columns": columns,
                language: {
                    url: './js/datatable-esp.json'
                }
            });
        } catch (error) {
            console.error(error);
        }
    },
    FillSelectTransportType: async () => {
        try {
            const data = await fetchs.GetTransportType();

            var $options = $();
            const $SeleccionaUnaOpcion = $('<option>').attr('value', 0).text("Selecciona una opcion");
            $options = $options.add($SeleccionaUnaOpcion);
            data.forEach(function (value) {
                const $option = $('<option>').attr('value', value.Id).text(value.Type);
                $options = $options.add($option);
            });

            $('#TransportTypeSelect').empty();
            $('#TransportTypeSelect').append($options);
        } catch (error) {
            console.error(error);
        }
    },
    AddOrUpdateTransportButton: async () => {
        try {
            const TransportId = sessionStorage.getItem("TransportId");
            const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
            const TransportTypeId = $('#TransportTypeSelect').val();
            const TransportPlate1 = $('#TransportPlate1').val();
            const TransportPlate2 = $('#TransportPlate2').val();
            const TransportPlate3 = $('#TransportPlate3').val();
            const Capacity = $('#Capacity').val();

            const Transport = {
                TransportId,
                userId,
                TransportTypeId,
                TransportPlate1,
                TransportPlate2,
                TransportPlate3,
                Capacity
            };

            const response = await fetchs.AddOrUpdateTransport(Transport);
        } catch (error) {
            console.error(error);
        }
    },
    AddOrUpdateTransportModal: async (e) => {
        try {
            if (e) {
                const Transport = $(e).attr('data');
                const TransportObj = JSON.parse(Transport);

                sessionStorage.setItem("TransportId", TransportObj.Id);
                $('#TransportTypeSelect').val(TransportObj.TransportTypeId);
                $('#TransportPlate1').val(TransportObj["Placa de Transporte"]);
                $('#TransportPlate2').val(TransportObj["Placa de Caja #1"]);
                $('#TransportPlate3').val(TransportObj["Placa de Caja #2"]);
                $('#Capacity').val(TransportObj["Capacidad"]);
            } else {
                sessionStorage.setItem("TransportId", 0);
                $('#TransportTypeSelect').val("");
                $('#TransportPlate1').val("");
                $('#TransportPlate2').val("");
                $('#TransportPlate3').val("");
                $('#Capacity').val("");
            };
            $('#AddOrUpdateTransportModal').modal('show');
        } catch (error) {
            console.error(error);
        }
    }
}
