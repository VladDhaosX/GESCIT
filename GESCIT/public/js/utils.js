const UtilUrlApi = window.__env.UrlApi;
const BasePath = window.__env.BasePath;
const pathname = window.location.pathname;

const fetchUserData = async () => {
    try {
        const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
        const response = await $.ajax({
            url: `${UtilUrlApi}/configuration/GetUserData`,
            type: 'POST',
            data: { userId },
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

    const userRol = userData.userRol.Name;
    const userName = userData.userData[0].Name;
    $menu.empty();
    $('#txtUserName').text(userName);
    $('#txtUserRol').text(userRol);

    userCategories.forEach((category) => {
        const $categoryHeader = $('<li>').addClass('menu-header small text-uppercase')
            .append($('<span>').addClass('menu-header-text').text(category.Name));

        $menu.append($categoryHeader);

        userData.userModules.filter(module => module.ModuleCategoriesId === category.Id)
            .forEach((module) => {
                const $moduleItem = $('<li>').addClass('menu-item')
                    .append($('<a>').attr('href', module.Key).addClass('menu-link')
                        .append($('<i>').addClass(`menu-icon tf-icons bx ${module.Icon}`))
                        .append($('<div>').attr('data-i18n', module.Name).text(module.Name)));
                $menu.append($moduleItem);
            });
    });
};

const tooltipTrigger = () => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
};

const ToastsNotification = async (titulo, message, type, placement) => {
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

if (pathname !== BasePath + '/login') {
    const userId = sessionStorage.getItem('userId');
    if (!userId) window.location.href = './login';
    createMenu();
}
