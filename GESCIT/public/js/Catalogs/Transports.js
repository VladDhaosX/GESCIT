const UrlApi = window.__env.UrlApi;

$(document).ready(async function () {
    await initButtons();
    await TransportsDataTable(true);
    await FillSelectTransportType();

    await tooltipTrigger();
});
//#region fetchs
const GetTransports = async (userId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/getTransports`, type: 'POST', data: {
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
const GetTransportType = async () => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            }, url: `${UrlApi}/catalogs/getTransportType`, type: 'GET', dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const AddOrUpdateTransport = async (Transport) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/addOrUpdateTransport`, type: 'POST', data: {
                Transport
            }, // Enviar Transport en el cuerpo de la solicitud
            dataType: 'json'
        });
        return response;
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
                <button id="AddOrUpdateTransportModalButton" type="button" title="Registrar transporte" 
                    class="btn rounded-pill btn-icon btn-outline-primary" 
                    data-bs-toggle="tooltip" data-bs-placement="top">
                    <span class="tf-icons bx bx-plus"></span>
                </button>
            `);

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
        // hide();

    } catch (error) {
        console.error(error);
    }
};
const TransportsDataTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#TransportTable')) {
            $('#TransportTable').DataTable().destroy();
            $('#TransportTable').empty();
        }

        const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
        const data = await GetTransports(userId);
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
                                        id="AddOrUpdateTransportTableButton"
                                        data='${JSON.stringify(row)}'
                                        title='Editar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='AddOrUpdateTransportModal(this);'
                                    >
                                        <span class="tf-icons bx bx-edit-alt"></span>
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
            $('#TransportTable').DataTable({
                data: data,
                columns: columns,
                language: {
                    url: './js/datatable-esp.json'
                },
                "columnDefs": [
                  { "type": "html", "targets": 5 }
                ]
            });
        }
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
        $('#TransportTypeSelect').trigger('change');
        $('#AddOrUpdateTransportModal').modal('show');
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

        const Transport = {
            TransportId,
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

        await ToastsNotification("Transportes", response.message, toastType, toastPlacement);
        await TransportsDataTable(false);

    } catch (error) {
        console.error(error);
    }
};
//#endregion