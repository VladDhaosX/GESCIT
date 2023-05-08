let permissions;
$.blockUI.defaults.baseZ = 4000;

$(document).ready(async function () {
    await ValidatePath();
    permissions = await GetRolesActionsByUserIdModuleId();
    createMenu();
    await initPage();
});

const initPage = async () => {
    sessionStorage.setItem("DateId", 0);

    $('#ActionsButtons').append(`
    <div class="row">
        <div class="col-2">
            <label class="form-label">Fecha Inicio</label>
            <input type="date" id="txtStartDate" class="form-control"/>
        </div>
        <div class="col-2">
            <label class="form-label">Fecha Fin</label>
            <input type="date" id="txtEndDate" class="form-control"/>
        </div>
        <div class="col-2">
            <button id="btnSearch" type="button" title="Buscar" 
                class="btn rounded-pill btn-icon btn-outline-primary" 
                data-bs-toggle="tooltip" data-bs-placement="top"
                style="margin-top:28px;">
                <span class="tf-icons bx bx-search"></span>
            </button>
            ${permissions.CREAR ? `<button id="btnNewDateModal" type="button" title="Registrar Cita" 
                class="btn rounded-pill btn-icon btn-outline-primary" 
                data-bs-toggle="tooltip" data-bs-placement="top"
                style="margin-top:28px;">
                <span class="tf-icons bx bx-plus"></span>
            </button>` : ''}
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

    // on btnSearch click
    $('#btnSearch').click(async function () {
        await initDatesDataTable();
    });

    $('#OperationsSelect').change(async function (e) {
        await FillSelectWAvailablesScheduleAActualSchedule(0);
    });

    $('#TransportTypeSelect').change(async function (e) {
        await onTransportTypeSelectChange();
        await FillSelectWAvailablesScheduleAActualSchedule(0);
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
    await FillSelectClient();
    await FillSelectProductPresentations();

    tooltipTrigger();

    permissions.Citas?.Cliente ? $('#txtDate').parent().show() : $('#txtDate').parent().hide();
    permissions.Citas && permissions.Citas['Fecha de Solicitud'] ? $('#ClientSelect').parent().show() : $('#ClientSelect').parent().hide();
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

const FillSelectProductPresentations = async () => {
    try {
        const data = await GetProductPresentations();
        console.log(data);
        var $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.Name);
            $options = $options.add($option);
        });

        $('#Presentation').empty();
        $('#Presentation').append($options);
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

const FillSelectClient = async () => {
    try {
        const data = await GetClients();

        var $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            const $option = $('<option>').attr('value', value.AccountNum).text(value.Name);
            $options = $options.add($option);
        });

        $('#ClientSelect').empty();
        $('#ClientSelect').append($options);
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

    sessionStorage.setItem('DateId', 0);

    $('#txtDate').val('').attr('disabled', false);
    $('#ClientSelect').val(0).attr('disabled', false);
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
    $('#ScheduleTimesSelect').val(0);
    $('#TransportPlate2 , #TransportPlate3').parent().hide();
    $('#Presentation').val(0);

    $('#ModalDatesTitle').text('Nueva Cita');

    await setTimeout(async function () {
        // const IsAvailableResponse = await IsAppointmentTimeAvailable();
        // const IsAvailable = IsAvailableResponse.IsTimeAvailable;
        // if (!IsAvailable) {
        //     ToastsNotification('Citas', 'No es posible solicitar una cita fuera del horario establecido de 00:00 hrs a 17:00 hrs.', "Danger", "Middle center");
        //     return;
        // };

        // const ExistsScheduleAvailablesResult = ExistsScheduleAvailables();
        // if (!ExistsScheduleAvailablesResult) {
        //     ToastsNotification('Citas', 'No existen citas disponibles para mañana.', "Danger", "Middle center");
        //     return;
        // };

        $('#ModalDates').modal('show');
    });
};

const newDate = async () => {
    try {

        // const IsAvailableResponse = await IsAppointmentTimeAvailable();
        // const IsAvailable = IsAvailableResponse.IsTimeAvailable;
        // if (!IsAvailable) {
        //     ToastsNotification('Citas', 'No es posible solicitar una cita fuera del horario establecido de 00:00 hrs a 17:00 hrs.', "Danger", "Middle center");
        //     return;
        // };


        const DateId = sessionStorage.getItem('DateId');

        const Date = $('#txtDate').val() || null;
        const Client = $('#ClientSelect').val() || null;
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
        const PresentationId =$('#Presentation').val();

        const response = await addOrUpdateDates(DateId, userId, ScheduleTimeId, operationTypeId, productId,
            transportLineId, transportId, transportTypeId, TransportPlate, TransportPlate2, TransportPlate3, driverId, Volume, Date, Client, PresentationId);
        let toastType = "Primary";
        let toastPlacement = "Top right";

        if (response.success) {
            $('#ModalDates').modal('hide');
            ToastsNotification("Citas", response.message, toastType, toastPlacement);
        } else {
            toastType = "Danger";
            toastPlacement = "Middle center";
            ToastsNotification("Citas", response.message, toastType, toastPlacement);
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
        };

        const userId = sessionStorage.getItem('userId');
        const StartDate = $('#txtStartDate').val();
        const EndDate = $('#txtEndDate').val();
        const data = await GetDates(userId, StartDate, EndDate);
        const dtcolumns = ['Cliente', 'Folio', 'Estatus', 'Fecha de Cita', 'Horario', 'Hora de Cita', 'Hora de Ingreso', 'Operacion', 'Línea de Transporte', 'Tipo de Transporte', 'Placa de Transporte ', 'Placa de Caja #1', 'Placa de Caja #2 ', 'Chofer', 'Producto', 'Volumen en Toneladas', 'Presentación']
        const columns = [
            {
                title: 'Acciones',
                data: 'Id',
                render: function (data, type, row) {
                    let buttons = '';
                    if (row.IsEditable && permissions.EDITAR == 1) {
                        buttons += `
                            <button
                                class="btn rounded-pill btn-icon btn-outline-primary" 
                                type="button" 
                                data='${JSON.stringify(row)}'
                                title='Editar'
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                action='ShowEditModal'>
                                <span class="tf-icons bx bx-edit-alt"></span>
                            </button>
                        `;
                    };

                    if (row.IsCancelable && permissions.CANCELAR == 1) {
                        buttons += `
                            <button
                                class="btn rounded-pill btn-icon btn-outline-danger" 
                                type="button" 
                                data='${JSON.stringify(row)}'
                                title='Cancelar'
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                action='ShowCancelateDateModal'
                            >
                                <span class="tf-icons bx bx-x bx-md"></span>
                            </button>
                            `;
                    };
                    if (row.Estatus == 'Arribo') {
                        buttons += `
                        <button
                            class="btn rounded-pill btn-icon btn-outline-primary" 
                            type="button" 
                            data='${JSON.stringify(row)}'
                            title='Ver'
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            action='ShowInfoDateModal'
                        >
                            <span class="tf-icons bx bx-show-alt bx-md"></span>
                        </button>
                        `;
                    };
                    return buttons;
                }
            }];

        dtcolumns.forEach((item) => {
            columns.push({
                title: item, data: item,
                render: function (data, type, row) {
                    if (item == 'Estatus' || item == 'Hora de Ingreso') return `<strong>${row[item] ? row[item] : ''}</strong>`;
                    return data;
                }
            });
        });

        $('#DatesTable').DataTable({
            data: data,
            columns: columns,
            order: [],
            language: {
                url: '../js/datatable-esp.json'
            },
            columnDefs: [{
                className: 'bolded',
                targets: 6,
                defaultContent: "",
                targets: "_all"
            }]
        }).on('draw', async function () {
            tooltipTrigger();
            $('button[action="ShowEditModal"]').off().on('click', async function () {
                await ShowEditModal(this);
            });
            $('button[action="ShowCancelateDateModal"]').off().on('click', async function () {
                await ShowCancelateDateModal(this);
            });
            $('button[action="ShowInfoDateModal"]').off().on('click', async function () {
                await ShowInfoDateModal(this);
            });
        });
    } catch (error) {
        console.error(error);
    };
};

const ShowEditModal = async (element) => {
    try {

        const IsAvailableResponse = await IsAppointmentTimeAvailable();
        const IsAvailable = IsAvailableResponse.IsTimeAvailable;
        if (!IsAvailable) {
            ToastsNotification('Citas', 'No es posible solicitar una cita fuera del horario establecido de 00:00 hrs a 17:00 hrs.', "Danger", "Middle center");
            return;
        };

        const data = JSON.parse($(element).attr('data'));
        console.log(data);
        sessionStorage.setItem('DateId', data.Id);
        $('#OperationsSelect').val(data.OperationId);
        $('#TransportTypeSelect').val(data.TransportTypeId);
        await onTransportTypeSelectChange();
        $('#TransportPlate1Select').val(data.TransportId);
        await FillSelectWAvailablesScheduleAActualSchedule(data.Id);
        $('#ScheduleTimesSelect').val(data.ScheduleTimeId);
        $('#TransportLineTypeSelect').val(data.TransportLineId);
        $('#TransportPlate1').val(data['Placa de Transporte']);
        $('#TransportPlate2').val(data['Placa de Caja #1']);
        $('#TransportPlate3').val(data['Placa de Caja #2']);
        $('#DriversSelect').val(data.DriverId);
        $('#ProductsSelect').val(data.ProductId);
        $('#txtVolume').val(data['Volumen en Toneladas']);
        $('#Presentation').val(data.PresentationId);

        const FechaSolicitud = new Date(data['Fecha de Solicitud']);
        $('#txtDate').val(FechaSolicitud.toISOString().split('T')[0]).attr('disabled', true);

        $('#ClientSelect').val(data.AccountNum).attr('disabled', true);

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
            ToastsNotification("Citas", response.message, toastType, toastPlacement);
        } else {
            toastType = "Danger";
            toastPlacement = "Middle center";
            ToastsNotification("Citas", response.message, toastType, toastPlacement);
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

const onTransportPlate1SelectChange = async (e) => {
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

const ExistsScheduleAvailables = async () => {
    try {
        const OperationTypeId = $('#OperationsSelect').val();
        const TransportTypeId = $('#TransportTypeSelect').val();
        const data = await GetScheduleAvailables(OperationTypeId, TransportTypeId);
        console.log(data);
        if (data.length > 0) {
            return true;
        } else {
            return false;
        };

    } catch (error) {
        console.error(error);
    }
};

const FillSelectWAvailablesScheduleAActualSchedule = async (DateId) => {
    try {
        const OperationTypeId = $('#OperationsSelect').val();
        const TransportTypeId = $('#TransportTypeSelect').val();

        if (OperationTypeId == 0) {
            const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona un Tipo de Operación y Tipo de Transporte");
            $('#ScheduleTimesSelect').empty().append($SeleccionaUnaopción);
            return;
        };

        const data = await GetAvailableScheduleTimesWActualSchedule(OperationTypeId, TransportTypeId, DateId);
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

const ShowInfoDateModal = async (element) => {
    try {
        const data = JSON.parse($(element).attr('data')) || {};
        sessionStorage.setItem('DateId', data.Id || 0);
        $('#DriverName').text(data?.Chofer);
        $('#TransportLine').text(data['Línea de Transporte'] || '');
        $('#TransportType').text(data['Tipo de Transporte'] || '');
        $('#TransportPlates').text(data['Placa de Transporte'] || '');
        $('#Date').text(data['Fecha de Cita'] || '');
        $('#Time').text(data['Hora de Cita'] || '');
        $('#Schedule').text(data?.Horario);

        data['Placa de Caja #1'] != '' ? $('#TransportPlates2').text(data['Placa de Caja #1']) : $('#TransportPlates2').parent().hide();
        data['Placa de Caja #2'] != '' ? $('#TransportPlates3').text(data['Placa de Caja #2']) : $('#TransportPlates3').parent().hide();

        await GetDriverPhoto(data.Id).then((base64Img) => {
            base64Img != '' ? $('#DriverPhoto').attr('src', base64Img) : $('#DriverPhoto').parent().hide();
        }).catch((error) => {
            console.error(error);
            $('#DriverPhoto').parent().hide();
        });

        $('#DateInformationModal').modal('show');
    } catch (error) {
        console.error(error);
    };
};