
let permissions;
$.blockUI.defaults.baseZ = 4000;

$(document).ready(async function () {
    await ValidatePath();
    permissions = await GetRolesActionsByUserIdModuleId();
    await createMenu();
    await initPage();
    await RolesDataTable();
});

const initPage = async () => {
    const btnSearchRol = `
    <button id="btnSearchRol" type="button" title="Buscar"
        class="btn rounded-pill btn-icon btn-outline-primary"
        style="margin-top: 28px;"
        data-bs-toggle="tooltip" data-bs-placement="top">
        <span class="tf-icons bx bx-search-alt-2"></span>
    </button>`;
    const btnNewRol = permissions.CREAR ? `
    <button id="btnNewDateModal" type="button" title="Registrar Rol" 
        class="btn rounded-pill btn-icon btn-outline-primary" 
        style="margin-top: 28px;"
        data-bs-toggle="tooltip" data-bs-placement="top">
        <span class="tf-icons bx bx-plus"></span>
    </button>` : '';
    const selectStatus = `
    <label for="selectStatus" class="form-label">Estatus</label>
    <select id="selectStatus" class="form-control" aria-label=".form-select-sm example">
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
    </select>`;

    $('#ActionsButtons').append(`
    <div class="row">
        <div class="col-2">
            ${selectStatus}
        </div>
        <div class="col-1">
            ${btnSearchRol}
            ${btnNewRol}
        </div>
    </div>
    `);

    $('#btnNewDateModal').click(function () {
        ShowRolModal(0);
    });

    $('#btnUpdRol').click(async function () {
        UpdateRolId();
    });

    $('#btnSearchRol').click(async function () {
        await RolesDataTable();
    });

    $('#selectStatus').change(async function () {
        await RolesDataTable();
    });

    $('#btnNavRolPermissions').on('show.bs.tab', function () {
        if ($.fn.DataTable.isDataTable('#ModulesActionsDataTable')) {
            $('#ModulesActionsDataTable').DataTable().destroy();
            $('#ModulesActionsDataTable').empty();
        };
    });

    $('#btnNavRolSubPermissions').on('shown.bs.tab', async function () {
        await SubModulesActionsDataTable();
    });

};

const RolesDataTable = async () => {
    try {
        const Status = $('#selectStatus').val();
        const data = await GetRoles(Status);

        if ($.fn.DataTable.isDataTable('#RolesDataTable')) {
            $('#RolesDataTable').DataTable().destroy();
            $('#RolesDataTable').empty();
        };

        if (data.length <= 0) return;

        const columns = [
            {
                title: 'Acciones', data: 'RolId',
                render: function (data, type, row) {
                    let buttons = '';
                    buttons += permissions.EDITAR ? `
                        <button
                            class="btn rounded-pill btn-icon btn-outline-primary" 
                            type="button" 
                            title='Editar'
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            RolId = "${data}"
                            action = "ShowRolModal">
                            <span class="tf-icons bx bx-edit-alt"></span>
                        </button>
                    ` : '';
                    return buttons;
                }
            },
            { title: 'Nombre', data: 'Nombre' },
            { title: 'Descripción', data: 'Descripción' },
            { title: 'Estatus', data: 'Estatus' }
        ];

        $('#RolesDataTable').DataTable({
            data: data,
            columns: columns,
            order: [],
            language: {
                url: '../js/datatable-esp.json'
            },
        }).on('draw', async function () {
            tooltipTrigger();

            $('[action="ShowRolModal"]').off('click').on('click', async function () {
                const RolId = $(this).attr('RolId');
                await ShowRolModal(RolId);
            });

        });

    } catch (error) {
        console.error(error);
    };
};

const ShowRolModal = async (RolId) => {
    try {
        sessionStorage.setItem('RolId', RolId);
        const ModalTittle = RolId === 0 ? 'Nuevo Rol' : 'Editar Rol';
        $('#ModalTittle').text(ModalTittle);

        const data = await GetRolId(RolId) || {};
        $('#txtName').val(data?.Name);
        $('#txtDescription').val(data?.Description);
        $('#ckStatusId').prop('checked', data?.StatusId == '1' ? true : false);

        await ModulesActionsDataTable();
        await SubModulesActionsDataTable();
        $('#ModalRol').modal('show');
        $('.nav-pills button[data-bs-target="#navRolInfo"]').tab('show');
    } catch (error) {
        console.error(error);
    }
};

const UpdateRolId = async () => {
    try {
        const RolId = sessionStorage.getItem('RolId');
        const Name = $('#txtName').val();
        const Description = $('#txtDescription').val();
        const StatusKey = $('#ckStatusId').prop('checked') ? 'Active' : 'Inactive';

        const checks = $('#ModulesActionsDataTable input[type="checkbox"]');
        const actionsPermissions = [];
        checks.each(function () {
            const moduleId = $(this).attr('moduleid');
            const actionId = $(this).attr('actionid');
            const isChecked = $(this).prop('checked');
            if (moduleId && actionId && isChecked) actionsPermissions.push({ ModuleId: moduleId, ActionId: actionId, Permission: isChecked });
        });
        const jsonActionsPermissions = JSON.stringify(actionsPermissions);

        const subChecks = $('#SubModulesActionsDataTable input[type="checkbox"]');
        const subActionsPermissions = [];
        subChecks.each(function () {
            const subModuleId = $(this).attr('submoduleid');
            const actionid = $(this).attr('actionid');
            const isChecked = $(this).prop('checked');
            if (subModuleId && actionid && isChecked) subActionsPermissions.push({ SubModuleId: subModuleId, ActionId: actionid, Permission: isChecked });
        });
        const jsonSubActionsPermissions = JSON.stringify(subActionsPermissions);

        const response = await UpdateRol(RolId, Name, Description, StatusKey, jsonActionsPermissions, jsonSubActionsPermissions);

        let toastType = "Primary";
        let toastPlacement = "Top right";
        if (response.success) {
            $('#ModalRol').modal('hide');
            ToastsNotification("Roles", response.message, toastType, toastPlacement);
            createMenu();
            await RolesDataTable();
        } else {
            toastType = "Danger";
            toastPlacement = "Middle center";
            ToastsNotification("Roles", response.message, toastType, toastPlacement);
        }

    } catch (error) {
        console.error(error);
    }
};

const ModulesActionsDataTable = async () => {
    try {
        const RolId = sessionStorage.getItem('RolId');
        const data = await GetRolesActionsPermissionsByRolId(RolId) || [];

        const Actions = [...new Set(data.map(item => item.ActionName))];
        const Modules = [...new Set(data.map(item => item.ModuleName))];

        const $thead = $('<thead></thead>');
        const $tbody = $('<tbody></tbody>');

        $thead.append('<th>Categoría</th>');
        $thead.append('<th>Menú</th>');
        Actions.forEach(action => {
            const $th = $(`<th>${action}</th>`);
            $thead.append($th);
        });

        Modules.forEach(module => {
            const $tr = $('<tr></tr>');
            const ModuleCategoryName = data.find(item => item.ModuleName === module).ModuleCategoryName;
            $tr.append('<td>' + ModuleCategoryName + '</td>');
            const $td = $(`<td>${module}</td>`);
            $tr.append($td);
            Actions.forEach(action => {
                const $td = $(`<td></td>`);
                const dataAction = data.find(item => item.ModuleName === module && item.ActionName === action);
                if (dataAction) {
                    const $input = $(`<input type="checkbox" class="form-check-input" moduleid="${dataAction.ModuleId}" actionid="${dataAction.ActionId}" ${dataAction.ActionPermissionStatusId === 1 ? 'checked' : ''}>`);
                    $td.append($input);
                }
                $tr.append($td);
            });
            $tbody.append($tr);
        });

        $('#ModulesActionsDataTable').empty()
            .append($thead)
            .append($tbody);

    } catch (error) {
        console.error(error);
    };
};

const SubModulesActionsDataTable = async () => {
    try {
        const RolId = sessionStorage.getItem('RolId');

        const checks = $('#ModulesActionsDataTable input[type="checkbox"][actionid="1"]');
        const actionsPermissions = [];
        checks.each(function () {
            const moduleId = $(this).attr('moduleid');
            const actionId = $(this).attr('actionid');
            const isChecked = $(this).prop('checked');
            if (moduleId && actionId && isChecked) actionsPermissions.push({ ModuleId: moduleId, ActionId: actionId, Permission: isChecked });
        });
        const jsonActionsPermissions = JSON.stringify(actionsPermissions);

        const data = await GetRolesSubModulesActionsPermissionsByRolId(RolId, jsonActionsPermissions) || [];

        const Actions = [...new Set(data.map(item => item.ActionName))];
        const Modules = [...new Set(data.map(item => item.ModuleName))];
        const SubModules = [...new Set(data.map(item => item.SubModuleName))];

        const $thead = $('<thead></thead>');
        const $tbody = $('<tbody></tbody>');

        $thead.append('<th>Categoría</th>');
        $thead.append('<th>Menú</th>');
        $thead.append('<th>Submenú</th>');
        Actions.forEach(action => {
            const $th = $(`<th>${action}</th>`);
            $thead.append($th);
        });

        Modules.forEach(module => {
            SubModules.forEach(submodule => {
                const $tr = $('<tr></tr>');
                const ModuleCategoryName = data.find(item => item.ModuleName === module && item.SubModuleName === submodule)?.ModuleCategoryName;
                if (!ModuleCategoryName) return;
                $tr.append('<td>' + ModuleCategoryName + '</td>');
                const $td = $(`<td>${module}</td>`);
                $tr.append($td);
                const $td2 = $(`<td>${submodule}</td>`);
                $tr.append($td2);
                Actions.forEach(action => {
                    const $td = $(`<td></td>`);
                    const dataAction = data.find(item => item.ModuleName === module && item.SubModuleName === submodule && item.ActionName === action);
                    if (dataAction) {
                        const $input = $(`<input type="checkbox" class="form-check-input" moduleid="${dataAction.ModuleId}" submoduleid="${dataAction.SubModuleId}" actionid="${dataAction.ActionId}" ${dataAction.ActionPermissionStatusId === 1 ? 'checked' : ''}>`);
                        $td.append($input);
                    }
                    $tr.append($td);
                });
                $tbody.append($tr);
            });
        });

        $('#SubModulesActionsDataTable').empty()
            .append($thead)
            .append($tbody);

    } catch (error) {
        console.error(error);
    };
};

const FillSelectModulesCategory = async (RolId) => {
    try {
        const data = await GetModuleCategoriesByRolId(RolId);
        $('#selModulesCategories').empty();
        $('#selModulesCategories').append(`<option value="0">Seleccione una opción</option>`);
        data.forEach(item => {
            $('#selModulesCategories').append(`<option value="${item.ModuleCategoryId}">${item.Nombre}</option>`);
        });
    } catch (error) {
        console.error(error);
    }
};