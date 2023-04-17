const UrlApi = window.__env.UrlApi;

$(document).ready(async function () {
    await initButtons();
    await PermissionsDataTable(true);
    await FillSelectRol();

    await tooltipTrigger();
});

const GetPermissions = async () => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/configuration/getPermissions`,
            type: 'GET',
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const GetRoles = async () => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            }, url: `${UrlApi}/configuration/GetRoles`, type: 'GET', dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const UpdatePermission = async (permissionUserId, RolId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/configuration/UpdatePermission`,
            type: 'POST',
            data: {
                permissionUserId,
                RolId
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const initButtons = async () => {
    try {
        $('#UpdatePermissionButton').click(function () {
            UpdatePermissionButton();
        });
    } catch (error) {
        console.error(error);
    }
};
const PermissionsDataTable = async () => {
    try {
        if ($.fn.DataTable.isDataTable('#PermissionTable')) {
            // Si la tabla está inicializada, destruye la instancia de DataTables asociada al elemento HTML
            $('#PermissionTable').DataTable().destroy();
        }

        const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
        const data = await GetPermissions(userId);
        if (data.length > 0) {
            // Crea el arreglo de objetos para las columnas del DataTable
            const columns = [
                {
                    title: 'Acciones',
                    data: 'Id',
                    "render": function (data, type, row) {
                        return `
                                    <button 
                                        class="btn rounded-pill btn-icon btn-outline-primary" 
                                        type="button" 
                                        id="UpdatePermissionTableButton"
                                        data='${JSON.stringify(row)}'
                                        title='Editar'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        onclick='UpdatePermissionModal(this);'
                                    >
                                        <span class="tf-icons bx bx-edit-alt"></span>
                                    </button>
                                `
                    }
                },
                ...Object.keys(data[0]).map(propName => ({
                    title: propName,
                    data: propName,
                    visible: !propName.includes('Id'),
                    render: function (data) {
                        return propName === "Capacidad" ? data + " Toneladas" : data
                    }
                }))
            ];
            $('#PermissionTable').DataTable({
                data: data,
                columns: columns,
                language: {
                    url: './js/datatable-esp.json'
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
};
const FillSelectRol = async () => {
    try {
        const data = await GetRoles();
        let $options = $();
        const $SeleccionaUnaopción = $('<option>').attr('value', 0).text("Selecciona una opción");
        $options = $options.add($SeleccionaUnaopción);
        data.forEach(function (value) {
            const $option = $('<option>').attr('value', value.Id).text(value.Rol);
            $options = $options.add($option);
        });

        $('#RolSelect').empty();
        $('#RolSelect').append($options);
    } catch (error) {
        console.error(error);
    }
};
const UpdatePermissionModal = async (e) => {
    try {
        if (e) {
            const Permission = $(e).attr('data');
            const PermissionObj = JSON.parse(Permission);

            if (PermissionObj.RolId == 4) {
                $('#UpdatePermissionButton').hide();
            }
            else {
                $('#UpdatePermissionButton').show();
            };

            sessionStorage.setItem("Permissions_UserId", PermissionObj.UserId);
            $('#RolSelect').val(PermissionObj.RolId);
   
            $('#UpdatePermissionModal').modal('show');
        }
    } catch (error) {
        console.error(error);
    }
};
const UpdatePermissionButton = async () => {
    try {
        const Permissions_UserId = sessionStorage.getItem("Permissions_UserId");
        const RolId = $('#RolSelect').val();

        const response = await UpdatePermission(Permissions_UserId, RolId);
        const toastType = response.success ? "Primary" : "Danger";
        const toastPlacement = response.success ? "Top right" : "Middle center";

        if (response.success) {
            $('#UpdatePermissionModal').modal('hide');
        }

        await ToastsNotification("Permissiones", response.message, toastType, toastPlacement);
        await PermissionsDataTable(false);
        await createMenu();
    } catch (error) {
        console.error(error);
    }
};