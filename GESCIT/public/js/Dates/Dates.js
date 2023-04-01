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
        await FillSelectScheduleAvailables();
    });

    $('#TransportTypeSelect').change(async function (e) {
        await onTransportTypeSelectChange();
        await FillSelectScheduleAvailables();
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
    await FillSelectAllSheduleTimes();
    await FillSelectOperationTimes();
    await FillSelectProducts();
    await FillSelectTransportLines();
    await FillSelectTransportPlate1();
    await FillSelectTransportType();
    await FillSelectDrivers();

    tooltipTrigger();

};

const FillSelectAllSheduleTimes = async () => {
    try {
        const OperationTypeId = $('#OperationsSelect').val();

        if (OperationTypeId == 0) {
            const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona un Tipo de Operación y Tipo de Transporte");
            $('#SheduleTimesSelect').empty().append($SeleccionaUnaopción);
            return;
        };

        const data = await GetSheduleTimes(OperationTypeId);
        const $options = data.map(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.TimeRange);
            return $option;
        });

        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una Opción");
        $options.unshift($SeleccionaUnaopción);

        $('#SheduleTimesSelect').empty().append($options);
    } catch (error) {
        console.error(error);
    }
};

const FillSelectScheduleAvailables = async () => {
    try {
        const OperationTypeId = $('#OperationsSelect').val();
        const TransportTypeId = $('#TransportTypeSelect').val();

        if (OperationTypeId == 0 || TransportTypeId == 0) {
            const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona un Tipo de Operación y Tipo de Transporte");
            $('#SheduleTimesSelect').empty().append($SeleccionaUnaopción);
            return;
        }

        const data = await GetScheduleAvailables(OperationTypeId, TransportTypeId);

        const $options = data.map(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.TimeRange);
            return $option;
        });

        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options.unshift($SeleccionaUnaopción);

        $('#SheduleTimesSelect').empty().append($options);
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

const ExistsScheduleAvailables = async () => {
    try {
        const OperationTypeId = $('#OperationsSelect').val();
        const TransportTypeId = $('#TransportTypeSelect').val();
        const data = await GetScheduleAvailables(OperationTypeId, TransportTypeId);

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

    $('#ModalDatesTitle').text('Nueva Cita');

    const IsAvailable = await IsAppointmentTimeAvailable();
    if (IsAvailable) {
        const ExistsScheduleAvailablesResult = await ExistsScheduleAvailables();
        if (!ExistsScheduleAvailablesResult) {
            // await FillSelectScheduleAvailables();
            $('#ModalDates').modal('show');
        } else {
            await ToastsNotification('Citas', 'No existen citas disponibles para mañana.', "Danger", "Middle center");
        };
    } else {
        await ToastsNotification('Citas', 'No es posible solicitar una cita fuera del horario establecido de 00:00 hrs a 17:00 hrs.', "Danger", "Middle center");
    };
};

const newDate = async () => {
    try {
        const DateId = sessionStorage.getItem('DateId');
        const userId = sessionStorage.getItem('userId');
        const sheduleTimeId = $('#SheduleTimesSelect').val();
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
            await ToastsNotification("Citas", response.message, toastType, toastPlacement);
        } else {
            toastType = "Danger";
            toastPlacement = "Middle center";
            await ToastsNotification("Citas", response.message, toastType, toastPlacement);
            await FillSelectScheduleAvailables();
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
                        return buttons;
                    }
                },
                ...Object.keys(data[0]).map(propName => ({
                    title: propName,
                    data: propName,
                    visible: !propName.includes('Id') && !propName.includes('IsCancelable')
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
        await FillSelectAllSheduleTimes();
        $('#SheduleTimesSelect').val(data.ScheduleTimeId);
        $('#TransportLineTypeSelect').val(data.TransportLineId);
        $('#TransportPlate1').val(data['Placa de Transporte']);
        $('#TransportPlate3').val(data['Placa de Caja #1']);
        $('#TransportPlate2').val(data['Placa de Caja #2']);
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
const GetSheduleTimes = async (OperationTypeId) => {
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

const GetScheduleAvailables = async (OperationTypeId, TransportTypeId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/ScheduleAvailables`,
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