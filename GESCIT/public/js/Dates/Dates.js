const UrlApi = window.__env.UrlApi;

$(document).ready(async function () {
    initPage();
    await tooltipTrigger();
});

//#region Controllers
const initPage = async () => {
    sessionStorage.setItem("DateId", 0);
    $('#ActionsButtons').append(`
    <div class="row">
        <button id="btnNewDateModal" type="button" title="Registrar Cita" 
            class="btn rounded-pill btn-icon btn-outline-primary" 
            data-bs-toggle="tooltip" data-bs-placement="top">
            <span class="tf-icons bx bx-plus"></span>
        </button>
        <div class="col mb-3">
            <input type="date" id="txtStartDate" class="form-control"/>
        </div>
        <div class="col mb-3">
            <input type="date" id="txtEndDate" class="form-control"/>
        </div>
    </div>
    `);

    // onclick event function of btnNewDate
    $('#btnNewDateModal').click(function () {
        newDateModal();
    });

    $('#btnNewDate').click(function () {
        newDate();
    });

    $('#TransportPlate2 , #TransportPlate3').parent().hide();
    $('#TransportsSelect').change(function () {
        $('#TransportPlate2 , #TransportPlate3').parent().hide();
        const select = $(this);
        const data = select.find(':selected').attr('data');
        if (data) {
            const dataObj = JSON.parse(data);

            const TransportTypeId = dataObj.TransportTypeId;
            const TransportPlate = dataObj['Placa de Transporte'];
            const TransportPlate2 = dataObj['Placa de Caja #1'];
            const TransportPlate3 = dataObj['Placa de Caja #2'];

            $('#TransportPlate1').val(TransportPlate);
            $('#TransportPlate2').val(TransportPlate2);
            $('#TransportPlate3').val(TransportPlate3);

            if (TransportTypeId == 2) {
                $('#TransportPlate2').parent().show();
            } else if (TransportTypeId == 5) {
                $('#TransportPlate2 , #TransportPlate3').parent().show();
            };
        };
    });

    $('#txtStartDate , #txtEndDate').change(async function () {
        await initDatesDataTable();
    });

    $('#TransportTypeSelect').change(async function (e) { 
        const TransportTypeId = $(this).val();
        await FillSelectTransports(TransportTypeId);

        $('#TransportPlate1 , TransportPlate2 , #TransportPlate3').val("");
        $('#TransportPlate2 , #TransportPlate3').val("").parent().hide();

        if (TransportTypeId == 2) {
            $('#TransportPlate2').val("").parent().show();
        } else if (TransportTypeId == 5) {
            $('#TransportPlate2 , #TransportPlate3').val("").parent().show();
        };
    });

    await FillSelectSheduleTimes();
    await FillSelectOperationTimes();
    await FillSelectProducts();
    await FillSelectTransportLines();
    await FillSelectTransports();
    await FillSelectTransportType();
    await FillSelectDrivers();

    await initDatesDataTable();

};

const newDateModal = () => {
    $('#SheduleTimesSelect').val(0);
    $('#OperationsSelect').val(0);
    $('#ProductsSelect').val(0);
    $('#TransportLineTypeSelect').val(0);
    $('#TransportsSelect').val(0).trigger('change');
    $('#TransportPlate1').val('');
    $('#TransportPlate2').val('');
    $('#TransportPlate3').val('');
    $('#DriversSelect').val(0);
    $('#txtVolume').val('');
    $('#TransportTypeSelect').val(0).trigger('change');

    $('#ModalDatesTitle').text('Nueva Cita');
    $('#ModalDates').modal('show');
};

const FillSelectSheduleTimes = async () => {
    try {
        const userId = sessionStorage.getItem('userId');
        const data = await GetSheduleTimes(userId);

        var $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.TimeRange);
            $options = $options.add($option);
        });

        $('#SheduleTimesSelect').empty();
        $('#SheduleTimesSelect').append($options);
    } catch (error) {
        console.error(error);
    }
};

const FillSelectOperationTimes = async () => {
    try {
        const userId = sessionStorage.getItem('userId');
        const data = await GetOperationTypes(userId);

        var $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.Name);
            $options = $options.add($option);
        });

        $('#OperationsSelect').empty();
        $('#OperationsSelect').append($options);
    } catch (error) {
        console.error(error);
    }
};

const FillSelectProducts = async () => {
    try {
        const userId = sessionStorage.getItem('userId');
        const data = await GetProducts(userId);

        var $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.Name);
            $options = $options.add($option);
        });

        $('#ProductsSelect').empty();
        $('#ProductsSelect').append($options);
    } catch (error) {
        console.error(error);
    }
};

const FillSelectTransportLines = async () => {
    try {
        const userId = sessionStorage.getItem('userId');
        const data = await GetTransportLines(userId);

        var $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value['Línea de Transporte']);
            $options = $options.add($option);
        });

        $('#TransportLineTypeSelect').empty();
        $('#TransportLineTypeSelect').append($options);
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
            const $option = $('<option>').attr('value', value.Id).text(value.Type).attr('data', JSON.stringify(value));
            $options = $options.add($option);
        });

        $('#TransportTypeSelect').empty();
        $('#TransportTypeSelect').append($options).trigger('change');
    } catch (error) {
        console.error(error);
    }
};

const FillSelectTransports = async (TransportTypeId) => {
    try {
        const userId = sessionStorage.getItem('userId');
        const data = await GetTransports(userId,TransportTypeId);

        var $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value['Tipo de Transporte'] + ' ' + value['Placa de Transporte']).attr('data', JSON.stringify(value));
            $options = $options.add($option);
        });

        $('#TransportsSelect').empty();
        $('#TransportsSelect').append($options).trigger('change');
    } catch (error) {
        console.error(error);
    }
};

const FillSelectDrivers = async () => {
    try {
        const userId = sessionStorage.getItem('userId');
        const data = await GetDrivers(userId);

        var $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.Nombre + ' ' + value.Apellido + ' ' + value['Apellido materno']);
            $options = $options.add($option);
        });

        $('#DriversSelect').empty();
        $('#DriversSelect').append($options);
    } catch (error) {
        console.error(error);
    }
};

const newDate = async () => {
    try {
        const DateId = sessionStorage.getItem('DateId');
        const userId = sessionStorage.getItem('userId');
        const sheduleTimeId = $('#SheduleTimesSelect').val();
        const operationTypeId = $('#OperationsSelect').val();
        const productId = $('#ProductsSelect').val();
        const transportLineId = $('#TransportLineTypeSelect').val();
        const transportId = $('#TransportsSelect').val();
        const transportTypeId = $('#TransportTypeSelect').val();
        const TransportPlate = $('#TransportPlate1').val();
        const TransportPlate2 = $('#TransportPlate2').val();
        const TransportPlate3 = $('#TransportPlate3').val();
        const driverId = $('#DriversSelect').val();
        const Volume = $('#txtVolume').val();

        const date = {
            DateId,
            userId,
            sheduleTimeId,
            operationTypeId,
            productId,
            transportLineId,
            transportId,
            transportTypeId,
            TransportPlate,
            TransportPlate2,
            TransportPlate3,
            driverId,
            Volume
        };

        const response = await addOrUpdateDates(date);
        let toastType = "Primary";
        let toastPlacement = "Top right";

        if (response.success) {
            $('#ModalDates').modal('hide');
            await ToastsNotification("Transportes", response.message, toastType, toastPlacement);
        } else {
            toastType = "Danger";
            toastPlacement = "Middle center";
            await ToastsNotification("Transportes", response.message, toastType, toastPlacement);
        }
        await initDatesDataTable();
    } catch (error) {
        console.error(error);
    }
};

const initDatesDataTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#DatesTable')) {
            $('#DatesTable').DataTable().destroy();
            $('#DatesTable').empty();
        }

        const userId = sessionStorage.getItem('userId');
        const StartDate = $('#txtStartDate').val();
        const EndDate = $('#txtEndDate').val();
        const data = await GetDates(userId, StartDate, EndDate);
        if (data.length > 0) {
            const columns = [
                // {
                //     title: 'Acciones',
                //     data: 'Id',
                //     "render": function (data, type, row) {
                //         return `
                //                 <button 
                //                     class="btn rounded-pill btn-icon btn-outline-primary" 
                //                     type="button" 
                //                     id="AddOrUpdateTransportTableButton"
                //                     data='${JSON.stringify(row)}'
                //                     title='Editar'
                //                     data-bs-toggle="tooltip"
                //                     data-bs-placement="top"
                //                     onclick='initModule.AddOrUpdateTransportModal(this);'
                //                 >
                //                     <span class="tf-icons bx bx-edit-alt"></span>
                //                 </button>
                //             `
                //     }
                // },
                ...Object.keys(data[0]).map(propName => ({
                    title: propName,
                    data: propName,
                    visible: !propName.includes('Id')
                }))
            ];
            $('#DatesTable').DataTable({
                data: data,
                columns: columns,
                "order": [],
                language: {
                    url: './js/datatable-esp.json'
                },
                "columnDefs": [
                  { "type": "num", "targets": 11 }
                ]
            });
        }
    } catch (error) {
        console.error(error);
    }
};

//#endregion

//#region Fetchs
const GetSheduleTimes = async (userId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetSheduleTimes`, type: 'POST', data: {
                userId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetOperationTypes = async (userId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetOperationTypes`, type: 'POST', data: {
                userId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetProducts = async (userId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetProducts`, type: 'POST', data: {
                userId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

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
            url: `${UrlApi}/dates/GetTransportLines`, type: 'POST', data: {
                userId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetTransports = async (userId,TransportTypeId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetTransportsByType`, type: 'POST', data: {
                userId,TransportTypeId
            },
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
            },
            url: `${UrlApi}/dates/GetTransportType`, 
            type: 'GET',
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetDrivers = async (userId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetDrivers`, type: 'POST', data: {
                userId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetDates = async (userId, StartDate, EndDate) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetDates`, type: 'POST', data: {
                userId,
                StartDate,
                EndDate
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const addOrUpdateDates = async (date) => {
    try {
        return await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/addOrUpdateDates`, type: 'POST', data: {
                date
            },
            dataType: 'json'
        });
    } catch (error) {
        console.error(error.message);
        $.unblockUI();
    };
};

//#endregion