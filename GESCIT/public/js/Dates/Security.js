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

const UpdateDateStatusArrival = async (DateId, NewStatus) => {
    try {
        const response = await $.ajax({
            async: true,
            beforeSend: function () {
                $.blockUI({ message: null });
            },
            complete: function () {
                $.unblockUI();
            },
            url: `${UrlApi}/dates/UpdateDateStatus`, type: 'POST', data: {
                DateId: DateId,
                NewStatus: NewStatus
            },
            dataType: 'json'
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

const ConfirmIdButton = async () => {
    try {
        const Folio = $('#InputDateId').val();
        const Response = await RegisterEntrance(Folio);
        const Date = $(Response).attr('data');
        if (Folio != "") {
            if (Date.length > 0) {
                const DateId = $(Date).attr('Id');
                const DriverName = $(Date).attr('Chófer');
                const TransportLine = $(Date).attr('Línea de Transporte');
                const Transport = $(Date).attr('Tipo de Transporte');
                const TransportPlate = $(Date).attr('Placa de Transporte');
                const AssignedDate = $(Date).attr('Dia');
                const AssignedTime = $(Date).attr('Horario');
                const TransportPlateOne = $(Date).attr('Placa de Caja #1');
                const TransportPlateTwo = $(Date).attr('Placa de Caja #2');

                sessionStorage.setItem("Id", DateId);
                sessionStorage.setItem("Folio", Folio);

                document.getElementById('DriverName').innerHTML = "<p>" + DriverName + "</p>";
                document.getElementById('TransportLine').innerHTML = "<p>" + TransportLine + "</p>";
                document.getElementById('TransportType').innerHTML = "<p>" + Transport + "</p>";
                document.getElementById('TransportPlates').innerHTML = "<p>" + TransportPlate + "</p>";
                document.getElementById('Date').innerHTML = "<p>" + AssignedDate + "</p>";
                document.getElementById('Time').innerHTML = "<p>" + AssignedTime + "</p>";

                if (TransportPlateOne != "") {
                    $('#OptionalPlatesRow').append(`
                    <div class="col mb-3">
                        <label for="PlateOne" class="form-label">Placa de caja #1:</label>
                        <div class="form-control-plaintext" id="PlateOne"></div>
                    </div>
                    <div class="col mb-3">
                        <label for="PlateTwo" class="form-label">Placa de caja #2:</label>
                        <div class="form-control-plaintext" id="PlateTwo"></div>
                    </div>
                    `);
                    document.getElementById('PlateOne').innerHTML = "<p>" + TransportPlateOne + "</p>";
                    document.getElementById('PlateTwo').innerHTML = "<p>" + TransportPlateTwo + "</p>";
                }
                else {
                    document.getElementById('OptionalPlatesRow').innerHTML = "";
                }

                $('#DateInformationModal').modal('show');
            }
            else {
                toastType = 'Danger';
                toastPlacement = 'Top right';
                await ToastsNotification("Folio no encontrado", "La cita no concuerda con ninguna cita del día de hoy.", toastType, toastPlacement);
            }
        }
        else {
            toastType = 'Danger';
            toastPlacement = 'Top right';
            await ToastsNotification("Campo Vacío", "Favor de insertar un folio.", toastType, toastPlacement);
        }
    } catch (error) {
        console.error(error);
    }
}

const RegisterAccessButton = async () => {
    try {
        Folio = sessionStorage.getItem('Id');
        const Response = await UpdateDateStatusArrival(Folio, "arrival");
        if (Response.success) {
            toastType = 'Primary';
            toastPlacement = 'Top right';
            await ToastsNotification("Arribo Registrado", Response.message, toastType, toastPlacement);
        }
        else if (!Response.success) {
            toastType = 'Danger';
            toastPlacement = 'Top right';
            await ToastsNotification("Arribo Negado", Response.message, toastType, toastPlacement);
        }

        $('#DateInformationModal').modal('hide');
        document.getElementById('InputDateId').value = '';


    } catch (error) {
        console.error(error);
    }
}

const initButtons = async () => {
    try {

        $('#ConfirmIdButton').click(async function () {
            await ConfirmIdButton();
        });

        $('#RegisterAccess').click(async function () {
            await RegisterAccessButton();
        });

    } catch (error) {
        console.error(error);
    }
};