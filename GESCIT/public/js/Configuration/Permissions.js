$(document).ready(async function () {
    await initModule.initButtons();
    await initModule.PermissionsDataTable(true);
    await initModule.FillSelectRol();

    await tooltipTrigger();
});

const fetchs = {
    GetPermissions: async (userId) => {
        try {
            const response = await $.ajax({
                url: 'http://localhost:8090/GescitApi/configuration/getPermissions',
                type: 'GET',
                dataType: 'json'
            });
            return response.success ? response.data : console.log(response.message);
        } catch (error) {
            console.error(error);
        }
    },
    GetRoles: async () => {
        try {
            const response = await $.ajax({ url: 'http://localhost:8090/GescitApi/configuration/GetRoles', type: 'GET', dataType: 'json' });
            return response;
        } catch (error) {
            console.error(error);
        }
    },
    UpdatePermission: async (permissionUserId, RolId) => {
        try {
            const response = await $.ajax({
                url: 'http://localhost:8090/GescitApi/configuration/UpdatePermission', 
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
        }
    }
}

const initModule = {
    initButtons: async () => {
        try {
            $('#UpdatePermissionButton').click(function () {
                initModule.UpdatePermissionButton()
            });
        } catch (error) {
            console.error(error);
        }
    },
    PermissionsDataTable: async () => {
        try {
            if ($.fn.DataTable.isDataTable('#PermissionTable')) {
                // Si la tabla está inicializada, destruye la instancia de DataTables asociada al elemento HTML
                $('#PermissionTable').DataTable().destroy();
            }

            const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
            const data = await fetchs.GetPermissions(userId);
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
                                        onclick='initModule.UpdatePermissionModal(this);'
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
    },
    FillSelectRol: async () => {
        try {
            const data = await fetchs.GetRoles();
            let $options = $();
            const $SeleccionaUnaOpcion = $('<option>').attr('value', 0).text("Selecciona una opcion");
            $options = $options.add($SeleccionaUnaOpcion);
            data.forEach(function (value) {
                const $option = $('<option>').attr('value', value.Id).text(value.Rol);
                $options = $options.add($option);
            });

            $('#RolSelect').empty();
            $('#RolSelect').append($options);
        } catch (error) {
            console.error(error);
        }
    },
    UpdatePermissionModal: async (e) => {
        try {
            if (e) {
                const Permission = $(e).attr('data');
                const PermissionObj = JSON.parse(Permission);

                sessionStorage.setItem("Permissions_UserId", PermissionObj.UserId);
                $('#RolSelect').val(PermissionObj.RolId);

                $('#UpdatePermissionModal').modal('show');
            }
        } catch (error) {
            console.error(error);
        }
    },
    UpdatePermissionButton: async () => {
        try {
            const Permissions_UserId = sessionStorage.getItem("Permissions_UserId");
            const RolId = $('#RolSelect').val();

            const response = await fetchs.UpdatePermission(Permissions_UserId, RolId);
            const toastType = response.success ? "Primary" : "Danger";
            const toastPlacement = response.success ? "Top right" : "Middle center";

            await ToastsNotification("Permissiones", response.message, toastType, toastPlacement);
            await initModule.PermissionsDataTable(false);

        } catch (error) {
            console.error(error);
        }
    },
}
