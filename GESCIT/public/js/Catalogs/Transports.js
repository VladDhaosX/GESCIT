$(document).ready( async function () {
    await TransportsDataTable();
    await FillSelectTransportType();
});

const fetchGetTransports = async () => {
    try {
        const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
        const response = await $.ajax({
            url: 'http://localhost:8090/GescitApi/catalogs/getTransports',
            type: 'POST',
            data: { userId }, // Enviar userId en el cuerpo de la solicitud
            dataType: 'json'
        });
        return response.success ?  response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
    }
};

const fetchGetTransportType = async () => {
    try {
        const userId = sessionStorage.getItem('userId'); // Obtener userId de la variable de sesión
        const response = await $.ajax({
            url: 'http://localhost:8090/GescitApi/catalogs/getTransportType',
            type: 'GET',
            dataType: 'json'
        });
        return response.success ?  response.data : console.log(response.message);
    } catch (error) {
        console.error(error);
    }
};

const TransportsDataTable = async () => {
    const data = await fetchGetTransports();
    const columns = Object.keys(data[0]).map((propName) => {
        return {"title": propName, "data": propName};
    });
    
    $('#TransportTable').DataTable({
        data: data,
        "columns": columns,    
        language: {
            url: './js/datatable-esp.json',
        },
      });
};

const FillSelectTransportType = async () => {
    const data = await fetchGetTransportType();
    
    var $options = $();
    const $SeleccionaUnaOpcion = $('<option>').attr('value', 0).text("Selecciona una opcion");
    $options = $options.add($SeleccionaUnaOpcion);
    data.forEach(function(value) {
      const $option = $('<option>').attr('value', value.Id).text(value.Type);
      $options = $options.add($option);
    });
    
    $('#TransportTypeSelect').empty();
    $('#TransportTypeSelect').append($options);
};
