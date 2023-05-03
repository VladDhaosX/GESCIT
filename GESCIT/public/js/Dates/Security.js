import * as Utils from '/js/Utils.js';
await Utils.ValidatePath();
const UrlApi = window.__env.UrlApi;
const permissions = await Utils.GetRolesActionsByUserIdModuleId();
$.blockUI.defaults.baseZ = 4000;

$(document).ready(async function () {
    await Utils.createMenu();
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
                const AssignedSchedule = $(Date).attr('Horario');
                const TransportPlateOne = $(Date).attr('Placa de Caja #1');
                const TransportPlateTwo = $(Date).attr('Placa de Caja #2');
                const Status = $(Date).attr('Estatus');
                const AssignedTime = $(Date).attr('Hora');


                sessionStorage.setItem("Id", DateId);
                sessionStorage.setItem("Folio", Folio);

                document.getElementById('DriverName').innerHTML = "<p>" + DriverName + "</p>";
                document.getElementById('TransportLine').innerHTML = "<p>" + TransportLine + "</p>";
                document.getElementById('TransportType').innerHTML = "<p>" + Transport + "</p>";
                document.getElementById('TransportPlates').innerHTML = "<p>" + TransportPlate + "</p>";
                document.getElementById('Date').innerHTML = "<p>" + AssignedDate + "</p>";
                document.getElementById('Time').innerHTML = "<p>" + AssignedTime + "</p>";
                document.getElementById('Schedule').innerHTML = "<p>" + AssignedSchedule + "</p>";
                document.getElementById('OptionalPlatesRow').innerHTML = "";

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

                if (Status != "Asignada") {
                    document.getElementById('RegisterAccess').style.display = 'none';
                    let toastType = 'Danger';
                    let toastPlacement = 'Top right';
                    if (Status == "Pendiente") {

                        await Utils.ToastsNotification("Cita Pendiente", "No es posible dar acceso a citas sin programar.", toastType, toastPlacement);
                    }
                    else if (Status === "Vencida") {
                        await Utils.ToastsNotification("Cita Vencida", "No es posible dar acceso a citas vencidas.", toastType, toastPlacement);
                    }
                    else if (Status == "Cancelada") {
                        await Utils.ToastsNotification("Cita Cancelada", "No es posible dar acceso a citas que han sido canceladas.", toastType, toastPlacement);
                    }
                    else if (Status == "Arribo") {
                        await Utils.ToastsNotification("Cita ya Registrada", "La cita cuya llegada intenta registrar ya pasó por caseta anteriormente.", toastType, toastPlacement);
                    }
                } else {
                    document.getElementById('RegisterAccess').style.display = 'block';
                }

                $('#DateInformationModal').modal('show');
            }
            else {
                let toastType = 'Danger';
                let toastPlacement = 'Top right';
                await Utils.ToastsNotification("Folio no encontrado", "La cita no concuerda con ninguna cita del día de hoy.", toastType, toastPlacement);
            }
        }
        else {
            let toastType = 'Danger';
            let toastPlacement = 'Top right';
            await Utils.ToastsNotification("Campo Vacío", "Favor de insertar un folio.", toastType, toastPlacement);
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
            let toastType = 'Primary';
            let toastPlacement = 'Top right';
            await Utils.ToastsNotification("Arribo Registrado", Response.message, toastType, toastPlacement);
        }
        else if (!Response.success) {
            let toastType = 'Danger';
            let toastPlacement = 'Top right';
            await Utils.ToastsNotification("Arribo Negado", Response.message, toastType, toastPlacement);
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