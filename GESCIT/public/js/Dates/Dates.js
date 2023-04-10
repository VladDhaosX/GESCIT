const UrlApi = window.__env.UrlApi;

$(document).ready(async function () {
    await initPage();
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

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    $('#txtStartDate , #txtEndDate').val(tomorrow.toISOString().split('T')[0]);

    $('#btnNewDateModal').click(function () {
        newDateModal();
    });

    $('#btnNewDate').click(function () {
        newDate();
    });

    $('#txtStartDate , #txtEndDate').change(async function () {
        await initDatesDataTable();
    });

    $('#OperationsSelect').change(async function (e) {
        await FillSelectScheduleAvailable();
    });

    $('#TransportTypeSelect').change(async function (e) {
        await onTransportTypeSelectChange();
        await FillSelectScheduleAvailable();
    });

    $('#TransportPlate2 , #TransportPlate3').attr('disabled', 'disabled');
    $('#TransportPlate2 , #TransportPlate3').parent().hide();
    $('#TransportPlate1Select').change(async function (e) {
        onTransportPlate1SelectChange(this);
    });

    $('#btnCancelDate').click(async function () {
        await CancelDateButton();
    });

    await initDatesDataTable();
    await FillSelectAllScheduleTimes();
    await FillSelectOperationTimes();
    await FillSelectProducts();
    await FillSelectTransportLines();
    await FillSelectTransportPlate1();
    await FillSelectTransportType();
    await FillSelectDrivers();

    tooltipTrigger();

};

const FillSelectAllScheduleTimes = async () => {
    try {
        const OperationTypeId = $('#OperationsSelect').val();

        if (OperationTypeId == 0) {
            const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona un Tipo de Operación y Tipo de Transporte");
            $('#ScheduleTimesSelect').empty().append($SeleccionaUnaopción);
            return;
        };

        const data = await GetScheduleTimes(OperationTypeId);
        const $options = data.map(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.TimeRange);
            return $option;
        });

        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una Opción");
        $options.unshift($SeleccionaUnaopción);

        $('#ScheduleTimesSelect').empty().append($options);
    } catch (error) {
        console.error(error);
    }
};

const FillSelectScheduleAvailable = async () => {
    try {
        const OperationTypeId = $('#OperationsSelect').val();
        const TransportTypeId = $('#TransportTypeSelect').val();

        if (OperationTypeId == 0 || TransportTypeId == 0) {
            const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona un Tipo de Operación y Tipo de Transporte");
            $('#ScheduleTimesSelect').empty().append($SeleccionaUnaopción);
            return;
        }

        const data = await GetScheduleAvailable(OperationTypeId, TransportTypeId);

        const $options = data.map(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.TimeRange);
            return $option;
        });

        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options.unshift($SeleccionaUnaopción);

        $('#ScheduleTimesSelect').empty().append($options);
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

const FillSelectTransportPlate1 = async (TransportTypeId) => {
    try {
        const userId = sessionStorage.getItem('userId');
        const data = await GetTransportPlate1(userId, TransportTypeId);

        const $options = data.map(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value['Placa de Transporte']).attr('data', JSON.stringify(value));
            return $option;
        });

        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options.unshift($SeleccionaUnaopción);

        $('#TransportPlate1Select').empty().append($options);
    } catch (error) {
        console.error(error);
    };
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

const ExistsScheduleAvailable = async () => {
    try {
        const OperationTypeId = $('#OperationsSelect').val();
        const TransportTypeId = $('#TransportTypeSelect').val();
        const data = await GetScheduleAvailable(OperationTypeId, TransportTypeId);

        if (data.length > 0) {
            return true;
        } else {
            return false;
        };

    } catch (error) {
        console.error(error);
    }
};

const newDateModal = async () => {

    const IsAvailableResponse = await IsAppointmentTimeAvailable();
    const IsAvailable = IsAvailableResponse.IsTimeAvailable;
    if (!IsAvailable) {
        await ToastsNotification('Citas', 'No es posible solicitar una cita fuera del horario establecido de 00:00 hrs a 17:00 hrs.', "Danger", "Middle center");
        return;
    };

    sessionStorage.setItem('DateId', 0);
    $('#SheduleTimesSelect').val(0);
    $('#OperationsSelect').val(0);
    $('#ProductsSelect').val(0);
    $('#TransportLineTypeSelect').val(0);
    $('#TransportPlate1Select').val(0);
    $('#TransportPlate1').val('');
    $('#TransportPlate2').val('');
    $('#TransportPlate3').val('');
    $('#DriversSelect').val(0);
    $('#txtVolume').val('');
    $('#TransportTypeSelect').val(0);
    $('#TransportPlate2 , #TransportPlate3').parent().hide();

    $('#ModalDatesTitle').text('Nueva Cita');

    if (ExistsScheduleAvailablesResult) {
        // await FillSelectScheduleAvailables();
        $('#ModalDates').modal('show');
    } else {
        await ToastsNotification('Citas', 'No existen citas disponibles para mañana.', "Danger", "Middle center");
    };
};

const newDate = async () => {
    try {

        const IsAvailableResponse = await IsAppointmentTimeAvailable();
        const IsAvailable = IsAvailableResponse.IsTimeAvailable;
        if (!IsAvailable) {
            await ToastsNotification('Citas', 'No es posible solicitar una cita fuera del horario establecido de 00:00 hrs a 17:00 hrs.', "Danger", "Middle center");
            return;
        };

        const DateId = sessionStorage.getItem('DateId');
        const userId = sessionStorage.getItem('userId');
        const ScheduleTimeId = $('#ScheduleTimesSelect').val();
        const operationTypeId = $('#OperationsSelect').val();
        const productId = $('#ProductsSelect').val();
        const transportLineId = $('#TransportLineTypeSelect').val();
        const transportId = $('#TransportPlate1Select').val();
        const transportTypeId = $('#TransportTypeSelect').val();
        const TransportPlate = $('#TransportPlate1').val();
        const TransportPlate2 = $('#TransportPlate2').val();
        const TransportPlate3 = $('#TransportPlate3').val();
        const driverId = $('#DriversSelect').val();
        const Volume = $('#txtVolume').val();

        const response = await addOrUpdateDates(DateId, userId, ScheduleTimeId, operationTypeId, productId, transportLineId, transportId, transportTypeId, TransportPlate, TransportPlate2, TransportPlate3, driverId, Volume);
        let toastType = "Primary";
        let toastPlacement = "Top right";

        if (response.success) {
            $('#ModalDates').modal('hide');
            await ToastsNotification("Citas", response.message, toastType, toastPlacement);
        } else {
            toastType = "Danger";
            toastPlacement = "Middle center";
            await ToastsNotification("Citas", response.message, toastType, toastPlacement);
            await FillSelectScheduleAvailable();
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
                {
                    title: 'Acciones',
                    data: 'Id',
                    render: function (data, type, row) {
                        let buttons = '';
                        if (row.Estatus == 'Pendiente') {
                            buttons += `
                            <button
                                class="btn rounded-pill btn-icon btn-outline-primary" 
                                type="button" 
                                data='${JSON.stringify(row)}'
                                title='Editar'
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                onclick='ShowEditModal(this)'
                            >
                                <span class="tf-icons bx bx-edit-alt"></span>
                            </button>
                        `

                            if (row.IsCancelable) {
                                buttons += `
                            <button
                                class="btn rounded-pill btn-icon btn-outline-danger" 
                                type="button" 
                                data='${JSON.stringify(row)}'
                                title='Cancelar'
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                onclick='ShowCancelateDateModal(this)'
                            >
                                <span class="tf-icons bx bx-x bx-md"></span>
                            </button>
                            `;
                            };
                        }
                        return buttons;
                    }
                },
                {
                    title: 'Cliente',
                    data: 'Cliente'
                },
                {
                    title: 'Folio',
                    data: 'Folio'
                },
                {
                    title: 'Estatus',
                    data: 'Estatus'
                },
                {
                    title: 'Fecha de Cita',
                    data: 'Fecha de Cita'
                },
                {
                    title: 'Horario',
                    data: 'Horario'
                },
                {
                    title: 'Operacion',
                    data: 'Operacion'
                },
                {
                    title: 'Línea de Transporte',
                    data: 'Línea de Transporte'
                },
                {
                    title: 'Tipo de Transporte',
                    data: 'Tipo de Transporte'
                },
                {
                    title: 'Placa de Transporte ',
                    data: 'Placa de Transporte'
                },
                {
                    title: 'Placa de Caja #1',
                    data: 'Placa de Caja #1'
                },
                {
                    title: 'Placa de Caja #2 ',
                    data: 'Placa de Caja #2'
                },
                {
                    title: 'Chofer',
                    data: 'Chofer'
                },
                {
                    title: 'Producto',
                    data: 'Producto'
                },
                {
                    title: 'Volumen en Toneladas',
                    data: 'Volumen en Toneladas'
                }
                // ...Object.keys(data[0]).map(propName => ({
                //     title: propName,
                //     data: propName,
                //     visible: !propName.includes('Id') && !propName.includes('IsCancelable')
                // }
                // ))
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
        };
    } catch (error) {
        console.error(error);
    };
};

const ShowEditModal = async (element) => {
    try {
        const data = JSON.parse($(element).attr('data'));
        sessionStorage.setItem('DateId', data.Id);
        $('#OperationsSelect').val(data.OperationId);
        $('#TransportTypeSelect').val(data.TransportTypeId);
        await onTransportTypeSelectChange();
        $('#TransportPlate1Select').val(data.TransportId);
        await FillSelectAllScheduleTimes();
        $('#ScheduleTimesSelect').val(data.ScheduleTimeId);
        $('#TransportLineTypeSelect').val(data.TransportLineId);
        $('#TransportPlate1').val(data['Placa de Transporte']);
        $('#TransportPlate2').val(data['Placa de Caja #1']);
        $('#TransportPlate3').val(data['Placa de Caja #2']);
        $('#DriversSelect').val(data.DriverId);
        $('#ProductsSelect').val(data.ProductId);
        $('#txtVolume').val(data['Volumen en Toneladas']);

        $('#ModalDatesTitle').text('Editar Cita');
        $('#ModalDates').modal('show');
    } catch (error) {
        console.error(error);
    };
};

const ShowCancelateDateModal = async (element) => {
    try {
        const data = JSON.parse($(element).attr('data'));
        sessionStorage.setItem('DateId', data.Id);
        $('#ModalCancelateDate').modal('show');
    } catch (error) {
        console.error(error);
    };
};

const CancelDateButton = async () => {
    try {
        const DateId = sessionStorage.getItem('DateId');
        const response = await CancelDate(DateId);
        let toastType = "Primary";
        let toastPlacement = "Top right";
        if (response.success) {
            $('#ModalCancelateDate').modal('hide');
            await ToastsNotification("Citas", response.message, toastType, toastPlacement);
        } else {
            toastType = "Danger";
            toastPlacement = "Middle center";
            await ToastsNotification("Citas", response.message, toastType, toastPlacement);
        }
        await initDatesDataTable();
    } catch (error) {
        console.error(error);
    };
};

const onTransportTypeSelectChange = async (e) => {
    const TransportTypeId = $('#TransportTypeSelect').val();
    await FillSelectTransportPlate1(TransportTypeId);

    $('#TransportPlate1 , TransportPlate2 , #TransportPlate3').val("");
    $('#TransportPlate2 , #TransportPlate3').val("").parent().hide();

    if (TransportTypeId == 2) {
        $('#TransportPlate2').val("").parent().show();
    } else if (TransportTypeId == 5) {
        $('#TransportPlate2 , #TransportPlate3').val("").parent().show();
    };
};

const onTransportPlate1SelectChange = (e) => {
    $('#TransportPlate2 , #TransportPlate3').parent().hide();
    const select = $(e);
    const data = select.find(':selected').attr('data');
    if (data) {
        const dataObj = JSON.parse(data);

        const TransportTypeId = dataObj.TransportTypeId;
        const TransportPlate2 = dataObj['Placa de Caja #1'];
        const TransportPlate3 = dataObj['Placa de Caja #2'];

        $('#TransportPlate2').val(TransportPlate2);
        $('#TransportPlate3').val(TransportPlate3);

        if (TransportTypeId == 2) {
            $('#TransportPlate2').parent().show();
        } else if (TransportTypeId == 5) {
            $('#TransportPlate2 , #TransportPlate3').parent().show();
        };
    };
};
//#endregion

//#region Fetchs
const GetScheduleTimes = async (OperationTypeId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetScheduleTimes`, type: 'POST', data: {
                OperationTypeId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetScheduleAvailable = async (OperationTypeId, TransportTypeId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/ScheduleAvailable`,
            type: 'POST',
            data: {
                OperationTypeId,
                TransportTypeId
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

const GetTransportPlate1 = async (userId, TransportTypeId) => {
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
                userId, TransportTypeId
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

const addOrUpdateDates = async (DateId, userId, ScheduleTimeId, operationTypeId, productId, transportLineId, transportId, transportTypeId, TransportPlate, TransportPlate2, TransportPlate3, driverId, Volume) => {
    try {
        return await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/addOrUpdateDates`, type: 'POST', data: { DateId, userId, ScheduleTimeId, operationTypeId, productId, transportLineId, transportId, transportTypeId, TransportPlate, TransportPlate2, TransportPlate3, driverId, Volume },
            dataType: 'json'
        });
    } catch (error) {
        console.error(error.message);
        $.unblockUI();
    };
};

const IsAppointmentTimeAvailable = async () => {
    try {
        return await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/IsAppointmentTimeAvailable`,
            type: 'GET',
            dataType: 'json'
        });
    } catch (error) {
        console.error(error.message);
        $.unblockUI();
    };
};

const CancelDate = async (dateId) => {
    try {
        return await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/CancelDate`, type: 'POST', data: {
                dateId
            },
            dataType: 'json'
        });
    } catch (error) {
        console.error(error.message);
        $.unblockUI();
    };
};

//#endregion