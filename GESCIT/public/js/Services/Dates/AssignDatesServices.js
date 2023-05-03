const UrlApi = window.__env.UrlApi;

const GetAllHoursOfSchedule = async (ScheduleId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/schedule/GetAllHoursOfSchedule`, type: 'POST', data: {
                ScheduleId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const GetDates = async (userId, StartDate, EndDate, Status) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetDates`, type: 'POST', data: {
                userId,
                StartDate,
                EndDate,
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
const GetSchedules = async () => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/schedule/GetSchedules`,
            type: 'GET',
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};
const PostAssignDateHour = async (DateId, Hour, Minutes) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/AssignDateHour`, type: 'POST', data: {
                DateId,
                Hour,
                Minutes
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
        $.unblockUI();
    };
};
const ReSendSms = async (DateId, PhoneNumber) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/mail/ReSendSms`, type: 'POST', data: {
                DateId,
                PhoneNumber
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
    };
};
const ReSendMail = async (DateId, Mail) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/mail/ReSendMail`, type: 'POST', data: {
                DateId,
                Mail
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
    };
};

export {
    GetAllHoursOfSchedule
    , GetDates
    , GetSchedules
    , PostAssignDateHour
    , ReSendSms
    , ReSendMail
};