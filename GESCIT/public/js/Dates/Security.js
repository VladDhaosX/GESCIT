const UrlApi = window.__env.UrlApi;

$(document).ready(async function () {
    await initButtons();
});

const RegisterEntrance = async (Folio) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetClientInfoByFolio`, type: 'POST', data: {
                Folio
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const ConfirmIdButton = async () => {
    try {
        const Folio = $('#InputDateId').val();
        const Response = await RegisterEntrance(Folio);

        const Date =$(Response).attr('data');
        const DriverName =$(Cita).attr('Chófer')

    } catch (error) {
        console.error(error);
    }}

const initButtons = async () => {
    try {
        
        $('#ConfirmIdButton').click(async function () {
            await ConfirmIdButton();
            $('#DateInformationModal').modal('show');
        });

    } catch (error) {
        console.error(error);
    }
};