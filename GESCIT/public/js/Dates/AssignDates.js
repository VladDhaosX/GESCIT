import * as Utils from '/js/Utils.js';
await Utils.ValidatePath();
const UrlApi = window.__env.UrlApi;
const permissions = await Utils.GetRolesActionsByUserIdModuleId();
$.blockUI.defaults.baseZ = 4000;

$(document).ready(async function () {
    await Utils.createMenu();
    await initPage();
});

//#region Controllers
const initPage = async () => {

    sessionStorage.setItem("DateId", 0);
    $('#ActionsButtons').append(`
    <div class="row">
        <div class="col-3 mb-3">
            <label for="txtDate" class="form-label">Fecha</label>
            <input type="date" id="txtDate" class="form-control" disabled />
        </div>
    </div>
    `);

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    $('#txtDate').val(tomorrow.toISOString().split('T')[0]);

    $('#TomorrowScheduleNav').on('shown.bs.tab', async function (e) {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        $('#txtDate').val(tomorrow.toISOString().split('T')[0]);

        $('#UlTomorrowDatesNavs button:first').tab('show');
    });

    $('#TodayScheduleNav').on('shown.bs.tab', async function (e) {
        $('#txtDate').val(new Date().toISOString().split('T')[0]);

        $('#UlTodayDatesNavs button:first').tab('show');
    });

    $('#btnAssignDateHour').on('click', async function () {
        AssignDateHour();
    });

    $('#NavTomorrowPendingDates').on('shown.bs.tab', async function (e) {
        await initDatesDataTable('pending', 'Tomorrow');
    });

    $('#NavTomorrowAssignedDates').on('shown.bs.tab', async function (e) {
        await initDatesDataTable('assigned', 'Tomorrow');
    });

    $('#NavTodayAssignedDates').on('shown.bs.tab', async function (e) {
        await initDatesDataTable('assigned', 'Today');
    });

    $('#NavTodayExpiredDates').on('shown.bs.tab', async function (e) {
        await initDatesDataTable('expired', 'Today');
    });

    $('#NavTodayArrivalDates').on('shown.bs.tab', async function (e) {
        await initDatesDataTable('arrival', 'Today');
    });

    // btnSendSms ONCLICK
    $('#btnSendSms').on('click', async function () {
        const PhoneNumber = $('#txtPhoneNumber').val();
        const DateId = sessionStorage.getItem('DateId');
        const response = await ReSendSms(DateId, PhoneNumber);

        let toastType = "Primary";
        let toastPlacement = "Top right";
        if (response.returnCodeInformation.success) {
            await ToastsNotification("Citas", "Mensaje enviado de forma exitosa.", toastType, toastPlacement);
        } else {
            toastType = "Danger";
            await ToastsNotification("Citas", "Ocurrió un error al enviar el mensaje.", toastType, toastPlacement);
        };
    });

    //btnSendMail ONCLICK
    $('#btnSendMail').on('click', async function () {
        const Email = $('#txtMail').val();
        const DateId = sessionStorage.getItem('DateId');
        const response = await ReSendMail(DateId, Email);
        if (response.returnCodeInformation.success) {
            await ToastsNotification("Citas", "Correo enviado de forma exitosa.", "Primary", "Top right");
        } else {
            await ToastsNotification("Citas", "Ocurrió un error al enviar el correo.", "Danger", "Top right");
        };
    });

    $('#selectHour').on('change', function () {
        $('#selectMinutes').empty();
        const latest_value = $(this).closest('select').find('option')
            .filter(':last').val();
        const first_value = $(this)[0].options[1].value;
        const value = $(this).val();

        console.log(first_value);
        let initMinute = 1;
        if (value == latest_value) {
            initMinute = 0;
            for (let i = initMinute; i <= 30; i++) {
                $('#selectMinutes').append(`<option value="${i}">${i}</option>`);
            };
        } else {
            if (value == 1 || value != first_value) {
                initMinute = 0;
            } else {
                initMinute = 1;
            }
            for (let i = initMinute; i < 60; i++) {
                $('#selectMinutes').append(`<option value="${i}">${i}</option>`);
            };
        };
        //alert(latest_value)
    });

    await initDatesDataTable('pending', 'Tomorrow');

    tooltipTrigger();
};

const initDatesDataTable = async (Status, Day) => {
    try {
        const userId = sessionStorage.getItem('userId');
        const StartDate = $('#txtDate').val();
        const EndDate = $('#txtDate').val();
        const getDatesData = await GetDates(userId, StartDate, EndDate, Status);

        const titles = ['01:00 AM a 08:00 AM', '08:01 AM a 12:00 PM', '12:01 PM a 04:00 PM', '04:01 PM a 08:00 PM'];

        const $DatesTab = $(`#${Status}${Day}DatesTab`);
        const $responsiveDiv = $(`<div class="text-nowrap table-responsive" style="margin: 25px 50px;"></div>`);
        const $DatesRow = $(`<div class="row" id="${Status}DatesRow"></div>`);

        $DatesTab.empty();
        $responsiveDiv.append($DatesRow);
        $DatesTab.append($responsiveDiv);

        if (getDatesData) {
            for (let i = 1; i <= 4; i++) {
                const $table = $(`<table id="${Status}Schedule${i}DataTable" class="table hover"></table>`);
                const $Row = $(`<div class="col-3"></div>`);
                $Row.append($table);
                $DatesRow.append($Row);

                if ($.fn.DataTable.isDataTable($table)) {
                    $($table).DataTable().destroy();
                    $($table).empty();
                };

                let data = getDatesData.filter(x => x.ScheduleTimeId == i || x.ScheduleTimeId == i + 4);
                data = data.filter(x => x.EstatusKey == Status);
                $table.DataTable({
                    paging: false,
                    data: data,
                    columns: [
                        {
                            title: titles[i - 1],
                            data: 'Folio',
                            render: function (data, type, row) {
                                return `<label style="width: 100%" data='${JSON.stringify(row)}' onclick="ViewDateData(this);"><span class="tf-icons bx bx-time"></span> ${data}</label>`;
                            }
                        }
                    ],
                    dom: '',
                    language: {
                        url: '/js/datatable-esp.json'
                    },
                    columnDefs: [{
                        defaultContent: "",
                        targets: "_all"
                    }]
                });
            };
        };
    } catch (error) {
        console.error(error);
    };
};

const ViewDateData = async (element) => {
    try {
        const data = JSON.parse($(element).attr('data'));
        sessionStorage.setItem('DateId', data.Id);
        $('#txtHorario').val(data.Horario);
        $('#txtOperacion').val(data.Operacion);
        $('#txtFechaCita').val(data['Fecha de Cita']);
        $('#txtTipoTransporte').val(data['Tipo de Transporte']);
        $('#txtNombreCliente').val(data.Cliente || '');
        $('#txtProducto').val(data.Producto);
        $('#txtLineaTransporte').val(data['Línea de Transporte']);
        $('#txtVolumen').val(data['Volumen en Toneladas']);
        await FillSelectHour(data.ScheduleTimeId);
        $('#ModalDateInfoTitle').text(`Información de la cita - ${data.Folio}`);
        $('#selectMinutes').empty();
        $('#selectMinutes').append(`<option value="">Seleccione los minutos</option>`);

        for (let i = 1; i < 60; i++) {
            $('#selectMinutes').append(`<option value="${i}">${i}</option>`);
        };

        $('#selectHour').val(data.Hour || 0);
        $('#selectMinutes').val(data.Minute || "");

        $('#txtPhoneNumber').val(data['PhoneNumber']);
        $('#txtMail').val(data.Mail);

        if (data.Estatus == 'Asignada') {
            $('#selectHour').attr('disabled', true);
            $('#selectMinutes').attr('disabled', true);
            $('#btnAssignDateHour').hide();
            $('#txtPhoneNumber').parent().show();
            $('#txtMail').parent().show();
            $('#btnSendSms').show();
            $('#btnSendMail').show();
            $('#divHoraArribo').hide();
        } else if (data.Estatus == 'Arribo') {
            $('#divHoraAsignada').hide();
            $('#divHoraArribo').show();
            $('#txtHoraArribo').val(data['Hora de Ingreso']);
            $('#txtPhoneNumber').parent().hide();
            $('#txtMail').parent().hide();
            $('#btnSendSms').hide();
            $('#btnSendMail').hide();
        } else if (data.Estatus == 'Vencida') {
            $('#divHoraAsignada').show();
            $('#divHoraArribo').hide();
            $('#selectHour').attr('disabled', true);
            $('#selectMinutes').attr('disabled', true);
            $('#btnAssignDateHour').hide();
            $('#txtPhoneNumber').parent().hide();
            $('#txtMail').parent().hide();
            $('#btnSendSms').hide();
            $('#btnSendMail').hide();
            $('#divHoraArribo').hide();
        } else if (data.Estatus == 'Pendiente') {
            $('#selectHour').attr('disabled', false);
            $('#selectMinutes').attr('disabled', false);
            $('#btnAssignDateHour').show();
            $('#txtPhoneNumber').parent().hide();
            $('#txtMail').parent().hide();
            $('#btnSendSms').hide();
            $('#btnSendMail').hide();
            $('#divHoraArribo').hide();
        };


        $('#ModalDateInfo').modal('show');
    } catch (error) {
        console.error(error);
    };
};

const FillSelectHour = async (ScheduleId) => {
    try {
        const AllHoursOfSchedule = await GetAllHoursOfSchedule(ScheduleId);
        $('#selectHour').empty();
        $('#selectHour').append(`<option value="0">Seleccione una hora</option>`);
        AllHoursOfSchedule.forEach(x => {
            $('#selectHour').append(`<option value="${x.iHora}">${x.Hora}</option>`);
        });
    } catch (error) {
        console.error(error);
    };
};

const AssignDateHour = async () => {
    try {
        const DateId = sessionStorage.getItem('DateId');
        const Hour = $('#selectHour').val();
        const Minutes = $('#selectMinutes').val();
        const response = await PostAssignDateHour(DateId, Hour, Minutes);
        let toastType = "Primary";
        let toastPlacement = "Top right";

        const assignResponse = response.response;
        const sendSmsResponse = response.smsResponse;
        const sendMailResponse = response.mailResponse;

        if (response.success != undefined && response.success == false) {
            toastType = "Danger";
            toastPlacement = "Middle center";
            await ToastsNotification("Citas", response.message, toastType, toastPlacement);
        };

        if (assignResponse.success) {
            await ToastsNotification("Citas", assignResponse.message, toastType, toastPlacement);
            $('#ModalDateInfo').modal('hide');

            const $activeTab = $('#UlScheduleNavs .active');
            const $activeTabTomorrow = $('#UlTomorrowDatesNavs .active');
            if ($activeTabTomorrow.length > 0) {
                $activeTabTomorrow.removeClass('active').removeClass('show');
                $activeTabTomorrow.trigger('click');
            } else {
                $activeTab.trigger('click');
            };
        } else {
            console.log(response.message);
        };

        toastType = "Primary";
        toastPlacement = "Top right";
        if (sendSmsResponse.returnCodeInformation.success) {
            console.log("Mensaje enviado de forma exitosa.");
            // await ToastsNotification("Citas", "Mensaje enviado de forma exitosa.", toastType, toastPlacement);
        } else {
            toastType = "Danger";
            await ToastsNotification("Citas", "Ocurrió un error al enviar el mensaje.", toastType, toastPlacement);
        };

        toastType = "Primary";
        toastPlacement = "Top right";
        if (sendMailResponse.returnCodeInformation.success) {
            console.log("Mensaje enviado de forma exitosa.");
            // await ToastsNotification("Citas", "Correo enviado de forma exitosa.", "Primary", "Top right");
        } else {
            await ToastsNotification("Citas", "Ocurrió un error al enviar el correo.", "Danger", "Top right");
        };

    } catch (error) {
        console.error(error);
    };
};
//#endregion

//#region fetches
const GetAllHoursOfSchedule = async (ScheduleId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/schedule/GetAllHoursOfSchedule`, type: 'POST', data: {
                ScheduleId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const GetDates = async (userId, StartDate, EndDate, Status) => {
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
                EndDate,
                Status
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const GetSchedules = async () => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/schedule/GetSchedules`,
            type: 'GET',
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const PostAssignDateHour = async (DateId, Hour, Minutes) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/AssignDateHour`, type: 'POST', data: {
                DateId,
                Hour,
                Minutes
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
        $.unblockUI();
    };
};
const ReSendSms = async (DateId, PhoneNumber) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/mail/ReSendSms`, type: 'POST', data: {
                DateId,
                PhoneNumber
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
    };
};
const ReSendMail = async (DateId, Mail) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/mail/ReSendMail`, type: 'POST', data: {
                DateId,
                Mail
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
    };
};
//#endregion
