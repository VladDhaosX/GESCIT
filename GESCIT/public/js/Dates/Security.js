const UrlApi = window.__env.UrlApi;

let permissions;
$.blockUI.defaults.baseZ = 4000;

$(document).ready(async function () {
    await ValidatePath();
    permissions = await GetRolesActionsByUserIdModuleId();
    createMenu();
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
    };
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

                $('#videoId').hide();
                if (Status != "Asignada") {
                    document.getElementById('RegisterAccess').style.display = 'none';
                    let toastType = 'Danger';
                    let toastPlacement = 'Top right';
                    if (Status == "Pendiente") {
                        ToastsNotification("Cita Pendiente", "No es posible dar acceso a citas sin programar.", toastType, toastPlacement);
                    }
                    else if (Status === "Vencida") {
                        ToastsNotification("Cita Vencida", "No es posible dar acceso a citas vencidas.", toastType, toastPlacement);
                    }
                    else if (Status == "Cancelada") {
                        ToastsNotification("Cita Cancelada", "No es posible dar acceso a citas que han sido canceladas.", toastType, toastPlacement);
                    }
                    else if (Status == "Arribo") {
                        ToastsNotification("Cita ya Registrada", "La cita cuya llegada intenta registrar ya pasó por caseta anteriormente.", toastType, toastPlacement);
                    }
                } else {
                    document.getElementById('RegisterAccess').style.display = 'block';
                    $('#photo').attr('src', '').hide();
                    $('#videoId').show();

                    var FACING_MODES = JslibHtml5CameraPhoto.FACING_MODES;
                    let videoElement = document.getElementById('videoId');
                    var cameraPhoto = new JslibHtml5CameraPhoto.default(videoElement);
                    cameraPhoto.startCamera(FACING_MODES.ENVIRONMENT, { width: 480, height: 640 })
                        .catch((error) => {
                            console.error('Camera not started!', error);
                        });

                    $('#btnCameraPhoto').off('click').click(async function () {
                        const ActualClass = $('#btnCameraPhoto > span').attr('class');
                        console.log(ActualClass);
                        if (ActualClass == "tf-icons bx bx-camera") {
                            const config = {
                                isImageMirror: true
                            };
                            let dataUri = cameraPhoto.getDataUri(config);
                            $('#videoId').hide();
                            $('#photo').attr('src', dataUri).show();
                            $('#btnCameraPhoto > span').removeClass().addClass('tf-icons bx bx-revision');
                        } else {
                            $('#videoId').show();
                            $('#photo').hide();
                            $('#btnCameraPhoto > span').removeClass().addClass('tf-icons bx bx-camera');
                        };
                    });

                    $('#DateInformationModal').on('hidden.bs.modal', function () {
                        cameraPhoto.stopCamera()
                        .catch((error)=>{
                            console.error('Camera not stopped!', error);
                        });
                    });


                };

                $('#DateInformationModal').modal('show');
            }
            else {
                let toastType = 'Danger';
                let toastPlacement = 'Top right';
                ToastsNotification("Folio no encontrado", "La cita no concuerda con ninguna cita del día de hoy.", toastType, toastPlacement);
            }
        }
        else {
            let toastType = 'Danger';
            let toastPlacement = 'Top right';
            ToastsNotification("Campo Vacío", "Favor de insertar un folio.", toastType, toastPlacement);
        }
    } catch (error) {
        console.error(error);
    }
}

const RegisterAccessButton = async () => {
    try {
        const Folio = sessionStorage.getItem('Id');
        const Response = await UpdateDateStatusArrival(Folio, "arrival");

        const PhotoBase64 = $('#photo').attr('src');
        console.log(PhotoBase64);
        if (PhotoBase64 != '') {
            const SaveDriverPhotoResponse = await SaveDriverPhoto();
        } else {
            let toastType = 'Danger';
            let toastPlacement = 'Top right';
            ToastsNotification("Seguridad", "Es obligatorio tomar una fotografia.", toastType, toastPlacement);
            return;
        };

        if (Response.success) {
            let toastType = 'Primary';
            let toastPlacement = 'Top right';
            ToastsNotification("Arribo Registrado", Response.message, toastType, toastPlacement);
        }
        else if (!Response.success) {
            let toastType = 'Danger';
            let toastPlacement = 'Top right';
            ToastsNotification("Arribo Negado", Response.message, toastType, toastPlacement);
        }

        $('#DateInformationModal').modal('hide');
        document.getElementById('InputDateId').value = '';


    } catch (error) {
        console.error(error);
    }
};

const SaveDriverPhoto = async () => {
    try {
        const DateId = sessionStorage.getItem('Id');
        const PhotoBase64 = $('#photo').attr('src');

        const base64ImgParts = PhotoBase64.split(',');
        const contentType = base64ImgParts[0].split(':')[1];
        const rawImg = window.atob(base64ImgParts[1]);
        const rawImgLength = rawImg.length;
        const imgArray = new Uint8Array(new ArrayBuffer(rawImgLength));

        for (let i = 0; i < rawImgLength; i++) {
            imgArray[i] = rawImg.charCodeAt(i);
        };

        const file = new File([imgArray], 'image.png', { type: contentType });

        const response = await SaveDriverPhotoRequest(DateId, file);
    } catch (error) {
        console.error(error);
    }
};

const SaveDriverPhotoRequest = async (DateId, file) => {
    try {
        const data = new FormData();
        data.append('DateId', DateId);
        data.append('file', file);

        const response = await $.ajax({
            beforeSend: async function (xhr) {
                await $.blockUI({ message: null });
            },
            complete: async function () {
                await $.unblockUI();
            },
            url: `${UrlApi}/documents/SaveDriverPhoto`,
            type: 'POST',
            data: data,
            processData: false,
            contentType: false
        });

        return response;
    } catch (error) {
        console.error(error);
    }
};

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