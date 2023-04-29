import * as Utils from '/js/Utils.js';
await Utils.ValidatePath();
const UrlApi = window.__env.UrlApi;

$(document).ready(async function () {
    await Utils.createMenu();
    await initPage();
    await RolesDataTable();
});

// #region controllers
const initPage = async () => {
    const btnSearchRol = `
    <button id="btnSearchRol" type="button" title="Buscar"
        class="btn rounded-pill btn-icon btn-outline-primary"
        style="margin-top: 28px;"
        onclick="RolesDataTable()"
        data-bs-toggle="tooltip" data-bs-placement="top">
        <span class="tf-icons bx bx-search-alt-2"></span>
    </button>
    `;
    const btnNewRol = `
    <button id="btnNewDateModal" type="button" title="Registrar Rol" 
        class="btn rounded-pill btn-icon btn-outline-primary" 
        style="margin-top: 28px;"
        data-bs-toggle="tooltip" data-bs-placement="top">
        <span class="tf-icons bx bx-plus"></span>
    </button>
    `;
    const selectStatus = `
    <label for="selectStatus" class="form-label">Estatus</label>
    <select id="selectStatus" class="form-control" aria-label=".form-select-sm example" onchange="RolesDataTable()">
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
    </select>
    `;

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

    $('#btnNavRolPermissions').on('show.bs.tab', function () {
        if ($.fn.DataTable.isDataTable('#ModulesActionsDataTable')) {
            $('#ModulesActionsDataTable').DataTable().destroy();
            $('#ModulesActionsDataTable').empty();
        };
    });

    $('#btnNavRolPermissions').on('shown.bs.tab', async function () {
        await ModulesActionsDataTable();
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
                    buttons += `
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
                    `;
                    return buttons;
                }
            },
            { title: 'Clave', data: 'LLave' },
            { title: 'Nombre', data: 'Nombre' },
            { title: 'Descripción', data: 'Descripción' },
            { title: 'Estatus', data: 'Estatus' }
        ];

        $('#RolesDataTable').DataTable({
            data: data,
            columns: columns,
            order: [],
            language: {
                url: '/js/datatable-esp.json'
            },
        }).on('draw', async function () {
            await Utils.tooltipTrigger();

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

        const data = RolId === 0 ? null : await GetRolId(RolId);
        $('#txtKey').val(data?.Key);
        $('#txtName').val(data?.Name);
        $('#txtDescription').val(data?.Description);
        $('#ckStatusId').prop('checked', data?.StatusId == '1' ? true : false);
        data ? $('#txtKey').attr('readonly', true) : $('#txtKey').attr('readonly', false);

        $('#ModalRol').modal('show');
        $('.nav-pills button[data-bs-target="#navRolInfo"]').tab('show');
    } catch (error) {
        console.error(error);
    }
};

const UpdateRolId = async () => {
    try {
        const RolId = sessionStorage.getItem('RolId');
        const Key = $('#txtKey').val();
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
        const response = await UpdateRol(RolId, Key, Name, Description, StatusKey, jsonActionsPermissions);

        let toastType = "Primary";
        let toastPlacement = "Top right";
        if (response.success) {
            $('#ModalRol').modal('hide');
            await Utils.ToastsNotification("Roles", response.message, toastType, toastPlacement);
            await Utils.createMenu();
            await RolesDataTable();
        } else {
            toastType = "Danger";
            toastPlacement = "Middle center";
            await Utils.ToastsNotification("Roles", response.message, toastType, toastPlacement);
        }

    } catch (error) {
        console.error(error);
    }
};

const ModulesActionsDataTable = async () => {
    try {
        const RolId = sessionStorage.getItem('RolId');
        const data = await GetRolesActionsPermissionsByRolId(RolId) || [];

        const ActionsPermission = data.reduce((acc, item) => {
            const { ModuleId, ModuleName, ActionName, ActionPermissionStatusId } = item;
            const existingModuleIndex = acc.findIndex(elem => elem.Modulo === ModuleName);
            if (existingModuleIndex === -1) {
                acc.push({ 'ModuleId': ModuleId, 'Modulo': ModuleName, [ActionName]: ActionPermissionStatusId });
            } else {
                acc[existingModuleIndex][ActionName] = ActionPermissionStatusId;
            }
            return acc;
        }, []);

        const columns = Object.keys(ActionsPermission[0]).map(item => {
            const isAction = item !== 'Modulo' && item !== 'ModuleId';

            return {
                title: item,
                data: item,
                visible: !item.includes('Id'),
                render: isAction
                    ? (dtData, type, row) => `
                    <div class="form-check">
                      <input
                        ModuleId="${row.ModuleId}"
                        ActionId="${data?.find(x => x.ActionName == item && x.ModuleId == row.ModuleId)?.ActionId}"
                        class="form-check-input"
                        type="checkbox"
                        ${dtData == '1' ? 'checked' : ''}
                      />
                    </div>`
                    : undefined
            };
        });

        $('#ModulesActionsDataTable').DataTable({
            data: ActionsPermission,
            columns: columns,
            order: [],
            language: {
                url: '/js/datatable-esp.json'
            },
            dom: 'Brtip',
            paginate: false,
        }).on('draw', async function () {
            await Utils.tooltipTrigger();
        });

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
// #endregion controllers
// #region fetches
const GetRoles = async (Status) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/configuration/GetRoles`,
            type: 'POST',
            data: {
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

const GetRolId = async (RolId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/configuration/GetRolId`,
            type: 'POST',
            data: {
                RolId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const UpdateRol = async (RolId, Key, Name, Description, StatusKey, Permissions) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/configuration/UpdateRol`,
            type: 'POST',
            data: {
                RolId,
                Key,
                Name,
                Description,
                StatusKey,
                Permissions
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetModuleCategoriesByRolId = async (RolId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/configuration/GetModuleCategoriesByRolId`,
            type: 'POST',
            data: {
                RolId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetRolesActionsPermissionsByRolId = async (RolId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/configuration/GetRolesActionsPermissionsByRolId`,
            type: 'POST',
            data: {
                RolId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
// #endregion fetches