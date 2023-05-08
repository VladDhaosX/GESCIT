let permissions;
$.blockUI.defaults.baseZ = 4000;

$(document).ready(async function () {
    await ValidatePath();
    permissions = await GetRolesActionsByUserIdModuleId();
    await createMenu();
    await initPage();
});

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
        };

        const date = $('#txtDate').val();
        const data = await GetDatesXSchedules(date);
        if (data.length > 0) {
            const columns = [
                ...Object.keys(data[0]).map(propName => ({
                    title: propName,
                    data: propName
                }))
            ];
            $('#DatesXSchedulesTable').DataTable({
                data: data,
                columns: columns,
                order: [],
                language: {
                    url: '../js/datatable-esp.json'
                }
            });
        };
    } catch (error) {
        console.error(error);
    };
};