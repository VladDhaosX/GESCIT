const UrlApi = window.__env.UrlApi;

$(document).ready(async function () {
    await initPage();
});


//#region Controllers
const initPage = async () => {
    sessionStorage.setItem("DateId", 0);
    $('#ActionsButtons').append(`
    <div class="row">
        <div class="col-3 mb-3">
            <label for="txtDate" class="form-label">Fecha</label>
            <input type="date" id="txtDate" class="form-control"/>
        </div>
        <div class="col-3 mb-3">
            <button 
                style="margin-top: 30px;"
                class="btn rounded-pill btn-icon btn-outline-primary"  
                type="button" id="btnSearchDates">
                <span class="tf-icons bx bx-search"></span>
            </button>
        </div>
    </div>
    `);

    $('#txtDate').val(new Date().toISOString().split('T')[0]);

    $('#txtDate').on('change', async function () {
        await initDatesDataTable();
    });

    $('#btnSearchDates').on('click', async function () {
        await initDatesDataTable();
    });

    await initDatesDataTable();

    tooltipTrigger();
};

const initDatesDataTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#Schedule1DataTable')) {
            $('#Schedule1DataTable').DataTable().destroy();
            $('#Schedule1DataTable').empty();
        };
        if ($.fn.DataTable.isDataTable('#Schedule2DataTable')) {
            $('#Schedule2DataTable').DataTable().destroy();
            $('#Schedule2DataTable').empty();
        };
        if ($.fn.DataTable.isDataTable('#Schedule3DataTable')) {
            $('#Schedule3DataTable').DataTable().destroy();
            $('#Schedule3DataTable').empty();
        };
        if ($.fn.DataTable.isDataTable('#Schedule4DataTable')) {
            $('#Schedule4DataTable').DataTable().destroy();
            $('#Schedule4DataTable').empty();
        };

        const userId = sessionStorage.getItem('userId');
        const StartDate = $('#txtDate').val();
        const EndDate = $('#txtDate').val();
        const data = await GetDates(userId, StartDate, EndDate);

        const DatesWSchedule1 = data.filter(x => x.ScheduleTimeId == 1 || x.ScheduleTimeId == 5);
        const DatesWSchedule2 = data.filter(x => x.ScheduleTimeId == 2 || x.ScheduleTimeId == 6);
        const DatesWSchedule3 = data.filter(x => x.ScheduleTimeId == 3 || x.ScheduleTimeId == 7);
        const DatesWSchedule4 = data.filter(x => x.ScheduleTimeId == 4 || x.ScheduleTimeId == 8);

        $('#Schedule1DataTable').DataTable({
            data: DatesWSchedule1,
            columns: [
                {
                    title: '01:00 AM a 08:00 AM',
                    data: 'Línea de Transporte',
                    render: function (data, type, row) {
                        return `<label style="width: 100%" data='${JSON.stringify(row)}' onclick="ViewDateData(this);"><span class="tf-icons bx bx-time"></span> ${data}</label>`;
                    }
                }
            ],
            "dom": '',
            language: {
                url: './js/datatable-esp.json'
            },
            columnDefs: [{
                "defaultContent": "",
                "targets": "_all"
            }]
        });
        $('#Schedule2DataTable').DataTable({
            data: DatesWSchedule2,
            columns: [
                {
                    title: '08:00 AM a 12:00 PM',
                    data: 'Línea de Transporte',
                    render: function (data, type, row) {
                        return `<label data='${JSON.stringify(row)}' onclick="ViewDateData(this);"><span class="tf-icons bx bx-time"></span> ${data}</label>`;
                    }
                }
            ],
            "dom": '',
            language: {
                url: './js/datatable-esp.json'
            },
            columnDefs: [{
                "defaultContent": "",
                "targets": "_all"
            }]
        });
        $('#Schedule3DataTable').DataTable({
            data: DatesWSchedule3,
            columns: [
                {
                    title: '12:00 PM a 04:00 PM',
                    data: 'Línea de Transporte',
                    render: function (data, type, row) {
                        return `<label data='${JSON.stringify(row)}' onclick="ViewDateData(this);"><span class="tf-icons bx bx-time"></span> ${data}</label>`;
                    }
                }
            ],
            "dom": '',
            language: {
                url: './js/datatable-esp.json'
            },
            columnDefs: [{
                "defaultContent": "",
                "targets": "_all"
            }]
        });
        $('#Schedule4DataTable').DataTable({
            data: DatesWSchedule4,
            columns: [
                {
                    title: '04:00 PM a 08:00 PM',
                    data: 'Línea de Transporte',
                    render: function (data, type, row) {
                        return `<label data='${JSON.stringify(row)}' onclick="ViewDateData(this);"><span class="tf-icons bx bx-time"></span> ${data}</label>`;
                    }
                }
            ],
            "dom": '',
            language: {
                url: './js/datatable-esp.json'
            },
            columnDefs: [{
                "defaultContent": "",
                "targets": "_all"
            }]
        });
    } catch (error) {
        console.error(error);
    };
};

const ViewDateData = async (element) => {
    try {
        const data = JSON.parse($(element).attr('data'));
        $('#txtHorario').val(data.Horario);
        $('#txtOperacion').val(data.Operacion);
        $('#txtFechaCita').val(data['Fecha de Cita']);
        $('#txtTipoTransporte').val(data['Tipo de Transporte']);
        $('#txtNombreCliente').val(data.Cliente || '');
        $('#txtProducto').val(data.Producto);
        $('#txtLineaTransporte').val(data['Línea de Transporte']);
        $('#txtVolumen').val(data['Volumen en Toneladas']);
        
        await FillSelectHour(data.ScheduleTimeId);
        // SET 60 MINUTES OPTION TO selectMinutes
        $('#selectMinutes').empty();
        $('#selectMinutes').append(`<option value="0">Seleccione los minutos</option>`);
        for (let i = 0; i < 60; i++) {
            $('#selectMinutes').append(`<option value="${i}">${i}</option>`);
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
            $('#selectHour').append(`<option value="${x.Id}">${x.Hora}</option>`);
        });
    } catch (error) {
        console.error(error);
    };
};

//#endregion

//#region fetchs
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
            url: `${UrlApi}/dates/GetAllHoursOfSchedule`, type: 'POST', data: {
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
            url: `${UrlApi}/dates/GetSchedules`,
            type: 'GET',
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
//#endregion
