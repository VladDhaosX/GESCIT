const fetchAcepptPrivacyNotice = async (userId) => {
    try {
        const response = await $.ajax({
            url: "http://localhost:8090/GesCitApi/configuration/UserPrivacyNotice",
            type: "POST",
            data: { userId },
            dataType: "json",
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}; const fetchLogin = async (username, password) => {
    try {
        const response = await $.ajax({
            url: "http://localhost:8090/GesCitApi/configuration/login",
            type: "POST",
            data: { username, password },
            dataType: "json",
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const fetchResetPassword = async (userResetPassword, emailResetPassword) => {
    try {
        const response = await $.ajax({
            url: "http://localhost:8090/GesCitApi/configuration/ResetPassowrd",
            type: "POST",
            data: { userResetPassword, emailResetPassword },
            dataType: "json",
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const fetchChangePassword = async (token, user, email, NewPassword, ConfirmedNewPassword) => {
    try {
        const response = await $.ajax({
            url: "http://localhost:8090/GesCitApi/configuration/ChangePassword",
            type: "POST",
            data: { token, user, email, NewPassword, ConfirmedNewPassword },
            dataType: "json",
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const login = async () => {
    sessionStorage.removeItem('userId');
    const username = $("#user").val();
    const password = $("#password").val();
    let toastType = 'Danger';
    let toastPlacement = 'Middle center';

    if (username == '') {
        await ToastsNotification("Login", "Es necesario el nombre de usuario", toastType, toastPlacement);
    } else
        if (password == '') {
            await ToastsNotification("Login", "Es necesario una contraseña", toastType, toastPlacement);
        } else {

            const response = await fetchLogin(username, password);
            let message = response.message;
            if (response.success) {
                sessionStorage.setItem('userId', response.Id);
                if (response.PrivacyNotice == 1) {
                    toastType = 'Primary';
                    toastPlacement = 'Top right';
                    setTimeout(() => {
                        window.location.href = "Permissions";
                    }, 2500);
                } else {
                    $('#PrivacyNoticeModal').modal('show');
                    var pdfUrl = 'https://portalesdemo.almer.com.mx/Gecit/assets/ALMER/AVISO%20DE%20PRIVACIDAD.pdf';
                    $('#pdf-iframe').attr('src', 'https://docs.google.com/viewerng/viewer?url=' + encodeURIComponent(pdfUrl) + '&embedded=true');
                };
            };
            await ToastsNotification("Login", message, toastType, toastPlacement);
        }
};

const ResetPassowrd = async () => {
    const userResetPassword = $("#userResetPassword").val();
    const emailResetPassword = $("#emailResetPassword").val();
    const response = await fetchResetPassword(userResetPassword, emailResetPassword);
    let toastType = 'Primary';
    let toastPlacement = 'Top right';
    if (!response.success) {
        toastType = 'Danger';
        toastPlacement = 'Middle center';
    };
    await ToastsNotification("Login", response.message, toastType, toastPlacement);
};

const PageHasToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('token')) {
        const token = urlParams.get('token')
        const user = urlParams.get('user')
        const email = urlParams.get('email')
        $('#ChangePasswordModal').modal('show');
    };
};

const ChangePassword = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    const user = urlParams.get('user');
    const email = urlParams.get('email');
    const NewPassword = $("#NewPassword").val();
    const ConfirmedNewPassword = $("#ConfirmedNewPassword").val();
    const response = await fetchChangePassword(token, user, email, NewPassword, ConfirmedNewPassword);

    let toastType = 'Primary';
    let toastPlacement = 'Top right';
    if (!response.success) {
        toastType = 'Danger';
        toastPlacement = 'Middle center';
    };
    await ToastsNotification("Login", response.message, toastType, toastPlacement);
    setTimeout(() => {
        window.location.href = "/login";
    }, 2500);

};

const AcepptPrivacyNotice = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await fetchAcepptPrivacyNotice(userId);
    if (response.success) {
        await login();
    };
};

$("#btn-login").click(function () {
    login();
});

$("#modal-recuperar").click(async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('token')) {
        $("#ChangePasswordModal").modal("show");
    } else {
        $("#modal-recup").modal("show");
    };
});

$("#btn-recuperar").click(async function () {
    await ResetPassowrd();
});

$("#ChangePasswordButton").click(async function () {
    await ChangePassword();
});

$("#PrivacyNoticeModalButton").click(async function () {
    await AcepptPrivacyNotice();
});

$(document).ready(function () {
    PageHasToken();
});
