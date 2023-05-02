import * as Utils from '/js/Utils.js';
await Utils.ValidatePath();
const UrlApi = window.__env.UrlApi;
const permissions = await Utils.GetRolesActionsByUserIdModuleId();
$.blockUI.defaults.baseZ = 4000;

$(document).ready(async function () {
    await initPage();
});

//#region Controllers
const initPage = async () => {
    sessionStorage.setItem("DateId", 0);
    $('#ActionsButtons').append(`
    <div class="row">
        <div class="col-2 mb-3">
            <label for="txtDate" class="form-label">Fecha</label>
            <input type="date" id="txtDate" class="form-control"/>
        </div>
        <button style="margin-top: 30px;" 
            id="btnLoadTable" type="button" title="Buscar" 
            class="btn rounded-pill btn-icon btn-outline-primary" 
            data-bs-toggle="tooltip" data-bs-placement="top">
            <span class="tf-icons bx bx-search"></span>
        </button>
    </div>
    `);

    $('#btnLoadTable').on('click', async function () {
        await initDatesXSchedulesDataTable();
    });

    $('#txtDate').on('change', async function () {
        await initDatesXSchedulesDataTable();
    });

    let today = new Date();
    today.setDate(today.getDate() + 1);
    $('#txtDate').val(today.toISOString().split('T')[0]);
    await initDatesXSchedulesDataTable();

    tooltipTrigger();
};

const initDatesXSchedulesDataTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#DatesXSchedulesTable')) {
            $('#DatesXSchedulesTable').DataTable().destroy();
            $('#DatesXSchedulesTable').empty();
        }

        const date = $('#txtDate').val();
        const data = await GetDatesXSchedules(date);
        console.log(data);
        if (data.length > 0) {
            const columns = [
                ...Object.keys(data[0]).map(propName => ({
                    title: propName,
                    data: propName
                }))
            ];
            console.log(columns);
            $('#DatesXSchedulesTable').DataTable({
                data: data,
                columns: columns,
                "order": [],
                language: {
                    url: '/js/datatable-esp.json'
                }
            });
        };
    } catch (error) {
        console.error(error);
    };
};

// #endregion

//#region fetches

const GetDatesXSchedules = async (date) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/tools/GetAllSchedulesAvailable`,
            type: 'POST',
            data: {
                date
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

// #endregion