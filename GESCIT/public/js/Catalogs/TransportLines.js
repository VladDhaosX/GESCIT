const UrlApi = window.__env.UrlApi;

$(document).ready(async function () {

    sessionStorage.setItem("TransportLineId", 0);
    sessionStorage.setItem("TemporalDocumentId", 0);

    await initButtons();
    await TransportLinesDataTable(true);
    await FillSelectTransportLineType();
    await tooltipTrigger();

});

//#region fetchs
const GetTransportLines = async (userId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/getTransportLines`, type: 'POST', data: {
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
const GetTransportLineType = async () => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            }, url: `${UrlApi}/catalogs/getTransportLineTypes`, type: 'GET', dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const GetTransportLineDocuments = async () => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            }, url: `${UrlApi}/catalogs/getTransportLineDocuments`, type: 'GET', dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const AddOrUpdateTransportLine = async (TransportLine) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/catalogs/addOrUpdateTransportLine`,
            type: 'POST',
            data: {
                TransportLine
            }, // Enviar TransportLine en el cuerpo de la solicitud
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
                <button id="AddOrUpdateTransportLineModalButton" type="button" title="Registrar Linea de Transporte" 
                    class="btn rounded-pill btn-icon btn-outline-primary" 
                    data-bs-toggle="tooltip" data-bs-placement="top">
                    <span class="tf-icons bx bx-plus"></span>
                </button>
            `);

        $('#AddOrUpdateTransportLineModalButton').click(async function () {
            await AddOrUpdateTransportLineModal();
        });
        
        $('#AddOrUpdateTransportLineButton').click(async function () {
            await AddOrUpdateTransportLineButton()
        });

    } catch (error) {
        console.error(error);
    }
};
const TransportLinesDataTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#TransportLineTable')) {
            $('#TransportLineTable').DataTable().destroy();
        }

        const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
        const data = await GetTransportLines(userId);
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
                                        onclick='AddOrUpdateTransportLineModal(this);'
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
        let TransportLineId = 0;
        let TemporalDocumentId = 0;
        if (e) {
            const TransportLine = $(e).attr('data');
            const TransportLineObj = JSON.parse(TransportLine);

            TransportLineId = TransportLineObj.Id;
            sessionStorage.setItem("TransportLineId", TransportLineId);

            $('#TransportLineTypeSelect').val(TransportLineObj.LineTypeId);
            $('#LineName').val(TransportLineObj['Línea de Transporte']);
        } else {
            sessionStorage.setItem("TransportLineId", TransportLineId);
            sessionStorage.setItem("TemporalDocumentId", TemporalDocumentId);

            $('#TransportLineTypeSelect').val(0);
            $('#LineName').val("");
        };
        $('#DocumentLineSelect').val(0);
        $('#LineDocument').val("");
        $('#AddOrUpdateTransportLineModal').modal('show');
        $('#DocumentsModalNavs button:first').tab('show');
    } catch (error) {
        console.error(error);
    }
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

        await ToastsNotification("Líneas de Transporte", response.message, toastType, toastPlacement);

    } catch (error) {
        console.error(error);
    }
};
//#endregion