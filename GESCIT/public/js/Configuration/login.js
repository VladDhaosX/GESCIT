const UrlApi = window.__env.UrlApi;

$('#divFooter').hide();

$(document).ready(async function () {
    sessionStorage.clear();
    let loginAttempts = localStorage.getItem('loginAttempts');
    let blockedUntil = localStorage.getItem('blockedUntil');

    if (!loginAttempts) localStorage.setItem('loginAttempts', 0);
    if (!blockedUntil) localStorage.setItem('blockedUntil', null);

    PageHasToken();
    await tooltipTrigger();
});

const fetchAcepptPrivacyNotice = async (userId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/configuration/UserPrivacyNotice`,
            type: `POST`,
            data: { userId },
            dataType: `json`
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const fetchLogin = async (username, password) => {
    try {
        return await $.ajax({
            async: true,
            beforeSend: async function () {
                await $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/configuration/login`,
            type: `POST`,
            data: { username, password },
            dataType: `json`,
        });
    } catch (error) {
        $.unblockUI();
        console.error(error);
    }
};

const fetchResetPassword = async (userResetPassword, emailResetPassword) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/configuration/ResetPassowrd`,
            type: `POST`,
            data: { userResetPassword, emailResetPassword },
            dataType: `json`,
        });
        return response;
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const fetchChangePassword = async (token, user, email, NewPassword, ConfirmedNewPassword) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/configuration/ChangePassword`,
            type: `POST`,
            data: { token, user, email, NewPassword, ConfirmedNewPassword },
            dataType: `json`,
        });
        return response;
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const login = async () => {
    // let blockedUntil = localStorage.getItem('blockedUntil');
    // if (blockedUntil && Date.now() < blockedUntil) {
    //     ErrorLoginNotification();
    //     return;
    // } else if (blockedUntil && Date.now() > blockedUntil) {
    //     localStorage.setItem('loginAttempts', 0);
    //     localStorage.setItem('blockedUntil', null);
    // };

    sessionStorage.removeItem('userId');
    const username = $(`#user`).val();
    const password = $(`#password`).val();
    let toastType = 'Danger';
    let toastPlacement = 'Middle center';

    if (username == '') {
        await ToastsNotification(`Login`, `Es necesario el nombre de usuario`, toastType, toastPlacement);
        return;
    }

    if (password == '') {
        await ToastsNotification(`Login`, `Es necesario una contraseña`, toastType, toastPlacement);
        return;
    }

    const response = await fetchLogin(username, password);
    if (response.success) {
        sessionStorage.setItem('userId', response.Id);
        if (response.PrivacyNotice == 1) {
            toastType = 'Primary';
            toastPlacement = 'Top right';
            setTimeout(() => {
                window.location.href = `Dates`;
            }, 2500);
            await ToastsNotification(`Login`, response.message, toastType, toastPlacement);
        } else {
            PrivacyNoticeModal();
        };
    } else {
        // blockLogin();
        await ToastsNotification(`Login`, response.message, toastType, toastPlacement);
    };
};

const ResetPassowrd = async () => {
    const userResetPassword = $(`#userResetPassword`).val();
    const emailResetPassword = $(`#emailResetPassword`).val();
    const response = await fetchResetPassword(userResetPassword, emailResetPassword);
    let toastType = 'Primary';
    let toastPlacement = 'Top right';
    if (!response.success) {
        toastType = 'Danger';
        toastPlacement = 'Middle center';
    };
    await ToastsNotification(`Login`, response.message, toastType, toastPlacement);
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
    const NewPassword = $(`#NewPassword`).val();
    const ConfirmedNewPassword = $(`#ConfirmedNewPassword`).val();
    const response = await fetchChangePassword(token, user, email, NewPassword, ConfirmedNewPassword);

    let toastType = 'Primary';
    let toastPlacement = 'Top right';
    if (response.success) {
        setTimeout(() => {
            window.location.href = `/login`;
        }, 2500);
    } else {
        toastType = 'Danger';
        toastPlacement = 'Middle center';
    };
    await ToastsNotification(`Login`, response.message, toastType, toastPlacement);

};

const PrivacyNoticeModal = async () => {
    // const pdfUrl = `https://portalesdemo.almer.com.mx/Gecit/assets/ALMER/priv.pdf`;

    // $('#pdf-iframe').attr('src', 'https://docs.google.com/viewerng/viewer?url=' + encodeURIComponent(pdfUrl) + '&embedded=true');

    $('#PrivacyNoticeModal').modal('show');
    // var count = 0;
    // $('#pdf-iframe').on('load', function () {
    //     count++;
    //     if (count > 0) {
    //         clearInterval(ref)
    //     }
    // });

    // var ref = setInterval(() => {
    //     $('#pdf-iframe').attr('src', 'https://docs.google.com/viewerng/viewer?url=' + encodeURIComponent(pdfUrl) + '&embedded=true');
    //     $('#pdf-iframe').on('load', function () {
    //         count++;
    //         if (count > 0) {
    //             clearInterval(ref)
    //         }
    //     });
    // }, 1000)
};

const AcepptPrivacyNotice = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await fetchAcepptPrivacyNotice(userId);
    if (response.success) {
        await login();
    };
};

const NotAcepptPrivacyNotice = async () => {
    await ToastsNotification(`Aviso de Privacidad`, "Es necesario aceptar el aviso de privacidad", "Danger", "Middle center");
};

const blockLogin = async () => {
    let loginAttempts = localStorage.getItem('loginAttempts');
    let blockedUntil = localStorage.getItem('blockedUntil');
    loginAttempts = parseInt(loginAttempts) + 1;
    localStorage.setItem('loginAttempts', loginAttempts);

    if (loginAttempts >= 3) {
        blockedUntil = Date.now() + 60000; // 60 segundos
        localStorage.setItem('blockedUntil', blockedUntil);
    }
    await ErrorLoginNotification();
};


const ErrorLoginNotification = async () => {
    let loginAttempts = localStorage.getItem('loginAttempts');
    let blockedUntil = localStorage.getItem('blockedUntil');
    const remainingTime = Math.round((blockedUntil - Date.now()) / 1000);
    let message = loginAttempts < 3 ? `${loginAttempts} de 3 intentos fallidos.` : ` Favor de esperar ${remainingTime} segundos, ha excedido los tres intentos permitidos`;
    await ToastsNotification(`Login`, message, 'Danger', 'Middle center');
};


$(`#btn-login`).click(async function () {
    await login();
});

$(`#modal-recuperar`).click(async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('token')) {
        $(`#ChangePasswordModal`).modal(`show`);
    } else {
        $(`#modal-recup`).modal(`show`);
    };
});

$(`#btn-recuperar`).click(async function () {
    await ResetPassowrd();
});

$(`#ChangePasswordButton`).click(async function () {
    await ChangePassword();
});

$(`#PrivacyNoticeModalButton`).click(async function () {
    await AcepptPrivacyNotice();
});

$(`#NotAcepptPrivacyNoticeButton`).click(async function () {
    await NotAcepptPrivacyNotice();
});
