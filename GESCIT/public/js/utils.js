const UtilUrlApi = window.__env.UrlApi;
const BasePath = window.__env.BasePath;
const pathname = window.location.pathname;

const fetchUserData = async () => {
    try {
        const userId = sessionStorage.getItem('userId');
        const ModuleId = sessionStorage.getItem('ModuleId');
        const response = await $.ajax({
            url: `${UtilUrlApi}/configuration/GetUserData`,
            type: 'POST',
            data: { userId, ModuleId },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const fetchGetRolesActionsByUserIdModuleId = async (UserId,ModuleId) => {
    try {
        const response = await $.ajax({
            url: `${UtilUrlApi}/configuration/GetRolesActionsByUserIdModuleId`,
            type: 'POST',
            data: { UserId, ModuleId },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const createMenu = async () => {
    const userData = await fetchUserData();
    const $menu = $('#ulSideMenu');
    const userCategories = userData.userCategories;

    const userRolKey = userData.userRol.Key;
    const userRol = userData.userRol.Name;
    const userName = userData.userData[0].Name;
    $menu.empty();
    $('#txtUserName').text(userName);
    $('#txtUserRol').text(userRol);
    sessionStorage.setItem('userRolKey', userRolKey);

    userCategories.forEach((category) => {
        const $categoryHeader = $('<li>').addClass('menu-header small text-uppercase')
            .append($('<span>').addClass('menu-header-text').text(category.Name).attr('style', 'color: #F07D1A'));

        $menu.append($categoryHeader);

        userData.userModules.filter(module => module.ModuleCategoriesId === category.Id)
            .forEach((module) => {
                const $moduleItem = $('<li>')
                    .addClass('menu-item')
                    .append($('<a>')
                        .attr('href', module.Route)
                        .addClass('menu-link')
                        .append($('<i>').addClass(`menu-icon tf-icons bx ${module.Icon}`).attr('style', 'color: #00558C'))
                        .append($('<div>').attr('data-i18n', module.Name).text(module.Name).attr('style', 'color: #00558C'))
                        .click(function () {
                            sessionStorage.setItem('ModuleId', module.Id);
                        })
                    );
                $menu.append($moduleItem);
            });
    });
};

const tooltipTrigger = async () => {
    $('.tooltip.fade.show').remove();
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
};

const ToastsNotification = async (titulo, message, type, placement) =>  {
    try {
        const placementList = {
            'Top left': 'top-0 start-0',
            'Top center': 'top-0 start-50 translate-middle-x',
            'Top right': 'top-0 end-0',
            'Middle left': 'top-50 start-0 translate-middle-y',
            'Middle center': 'top-50 start-50 translate-middle',
            'Middle right': 'top-50 end-0 translate-middle-y',
            'Bottom left': 'bottom-0 start-0',
            'Bottom center': 'bottom-0 start-50 translate-middle-x',
            'Bottom right': 'bottom-0 end-0'
        }
        const typeList = {
            'Primary': 'bg-primary',
            'Secondary': 'bg-secondary',
            'Success': 'bg-success',
            'Danger': 'bg-danger',
            'Warning': 'bg-warning',
            'Info': 'bg-info',
            'Dark': 'bg-dark'
        };

        const selectedPlacement = placementList[placement];
        const selectedType = typeList[type];

        const toastPlacementExample = $('#toastNotification');
        toastPlacementExample.removeClass();
        toastPlacementExample.addClass('bs-toast toast toast-placement-ex m-2');
        toastPlacementExample.addClass(selectedPlacement);
        toastPlacementExample.addClass(selectedType);
        console.log(titulo);
        $('#toastTitle').text(titulo);
        $('#toastMessage').text(message);

        const toastPlacement = new bootstrap.Toast(toastPlacementExample);
        toastPlacement.show();
    } catch (error) {
        console.error(error);
    }
};

const GetRolesActionsByUserIdModuleId = async () => {
    try {
        const userId = sessionStorage.getItem('userId');
        const ModuleId = sessionStorage.getItem('ModuleId');
        const response = await fetchGetRolesActionsByUserIdModuleId(userId,ModuleId);
        const permissions = {};
        response.forEach((perm) => {
            const Permission = perm.Permission;
            const ActionKey = perm.ActionKey;
            if (Permission === 1) {
                permissions[ActionKey] = true;
            };
        });
        return permissions;
    } catch (error) {
        console.error(error);
    }
};

const ValidatePath = () => {
    if (pathname !== BasePath + '/Configuracion/login') {
        const userId = sessionStorage.getItem('userId');
        if (!userId) window.location.href = '/Configuracion/login';
    };
};

export { 
    createMenu, 
    tooltipTrigger, 
    ToastsNotification,
    ValidatePath,
    GetRolesActionsByUserIdModuleId
};