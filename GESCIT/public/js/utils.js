const fetchUserData = async () => {
    try {
        const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
        const response = await $.ajax({
            url: 'http://localhost:8090/GescitApi/configuration/GetUserData',
            type: 'POST',
            data: { userId }, // Enviar userId en el cuerpo de la solicitud
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

    userCategories.forEach((category) => {
        const $categoryHeader = $('<li>').addClass('menu-header small text-uppercase')
            .append($('<span>').addClass('menu-header-text').text(category.Name));

        $menu.append($categoryHeader);

        userData.userModules.filter(module => module.ModuleCategoriesId === category.Id)
            .forEach((module) => {
                const $moduleItem = $('<li>').addClass('menu-item')
                    .append($('<a>').attr('href', 'javascript:void(0);').addClass('menu-link')
                        .append($('<i>').addClass(`menu-icon tf-icons bx ${module.Key}`))
                        .append($('<div>').attr('data-i18n', module.Name).text(module.Name)));
                $menu.append($moduleItem);
            });
    });
};

$(document).ready(() => {
    sessionStorage.setItem('userId', 1);
    createMenu();
});