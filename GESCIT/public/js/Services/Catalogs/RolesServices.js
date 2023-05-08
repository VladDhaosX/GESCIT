const UrlApi = window.__env.UrlApi;

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

const UpdateRol = async (RolId, Name, Description, StatusKey, Permissions, SubPermissions) => {
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
                Name,
                Description,
                StatusKey,
                Permissions,
                SubPermissions
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

const GetRolesSubModulesActionsPermissionsByRolId = async (RolId, jsonActionsPermissions) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/configuration/GetRolesSubModulesActionsPermissionsByRolId`,
            type: 'POST',
            data: {
                RolId,
                jsonActionsPermissions
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
