const UrlApi = window.__env.UrlApi;

const GetScheduleTimes = async (OperationTypeId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/schedule/GetScheduleTimes`, type: 'POST', data: {
                OperationTypeId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetScheduleAvailable = async (OperationTypeId, TransportTypeId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/schedule/ScheduleAvailable`,
            type: 'POST',
            data: {
                OperationTypeId,
                TransportTypeId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetOperationTypes = async (userId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetOperationTypes`, type: 'POST', data: {
                userId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetProducts = async (userId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetProducts`, type: 'POST', data: {
                userId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetTransportLines = async (userId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetTransportLines`, type: 'POST', data: {
                userId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetTransportPlate1 = async (userId, TransportTypeId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetTransportsByType`, type: 'POST', data: {
                userId, TransportTypeId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetTransportType = async () => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetTransportType`,
            type: 'GET',
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetDrivers = async (userId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/GetDrivers`, type: 'POST', data: {
                userId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetDates = async (userId, StartDate, EndDate) => {
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
                EndDate
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const addOrUpdateDates = async (DateId, userId, ScheduleTimeId, operationTypeId, productId, transportLineId, transportId, transportTypeId, TransportPlate, TransportPlate2, TransportPlate3, driverId, Volume, Date, AccountNum) => {
    try {
        return await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/addOrUpdateDates`, type: 'POST', data: {
                DateId,
                userId,
                ScheduleTimeId,
                operationTypeId,
                productId,
                transportLineId,
                transportId,
                transportTypeId,
                TransportPlate,
                TransportPlate2,
                TransportPlate3,
                driverId,
                Volume,
                Date,
                AccountNum
            },
            dataType: 'json'
        });
    } catch (error) {
        console.error(error.message);
        $.unblockUI();
    };
};

const IsAppointmentTimeAvailable = async () => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/schedule/IsAppointmentTimeAvailable`,
            type: 'GET',
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error.message);
        $.unblockUI();
    };
};

const CancelDate = async (dateId) => {
    try {
        return await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/CancelDate`, type: 'POST', data: {
                dateId
            },
            dataType: 'json'
        });
    } catch (error) {
        console.error(error.message);
        $.unblockUI();
    };
};

const GetScheduleAvailables = async (OperationTypeId, TransportTypeId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/schedule/ScheduleAvailable`,
            type: 'POST',
            data: {
                OperationTypeId,
                TransportTypeId
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetAvailableScheduleTimesWActualSchedule = async (OperationTypeId, TransportTypeId, DateId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/schedule/GetAvailableScheduleTimesWActualSchedule`, type: 'POST', data: {
                OperationTypeId,
                TransportTypeId,
                DateId,
            },
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
        $.unblockUI();
    }
};

const GetDriverPhoto = async (DateId) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/documents/GetDriverPhoto`, type: 'POST', data: {
                DateId
            },
            dataType: 'binary',
            xhrFields: {
                responseType: 'blob'
            }
        });

        return new Promise((resolve, reject) => {
            if (response.size == 0) return reject(false);
            const reader = new FileReader();
            reader.readAsDataURL(response);

            reader.onload = () => {
                const base64Img = reader.result;
                resolve(base64Img);
            };
            reader.onerror = () => {
                reject('Error al leer el archivo');
            };
        });
    } catch (error) {
        $.unblockUI();
    }
};

const GetClients = async () => {
    try {
        const response = await $.ajax({
            async: true,
            url: `${UrlApi}/dates/GetClients`,
            type: 'GET',
            dataType: 'json'
        });
        return response.success ? response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
    }
};