const UrlApi = window.__env.UrlApi;

const GetDatesXSchedules = async (date) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/tools/GetAllSchedulesAvailable`,
            type: 'POST',
            data: {
                date
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};