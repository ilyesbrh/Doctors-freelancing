import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

var id;

jQuery(document).ready(function () {

    let params = new URLSearchParams(window.location.search);
    id = params.get("id");
    name = params.get("name");

    $('#name').text(name);

    jQuery('#date').datetimepicker(
        {
            minDate: moment().toDate(),//yesterday is minimum date(for today use 0 or -1970/01/01)
            maxDate: moment().add(7, 'days').toDate(),//tomorrow is maximum date calendar
            format: 'm-d-Y H:i'
        }
    );
});

$('#login-btn').on('click', function () {

    bookAppointment().then();

    return false;

});
async function bookAppointment() {
    let data = {
        doctor: id,
        from_time: $('#date').val(),
        description: $('#description').val(),
    };

    console.log(data);

    try {

        let response = await api.bookAppointment(data);

        if (response) {

            console.log('[RESPONSE]');
            console.log(response);

            await swal({
                title: "Booked successfully!",
                text: "You appointments is fixed.",
                icon: "success",
            });

            location.href = 'booking-success.html?data=' + JSON.stringify({ name: doctor.name, time: $('#date').val() });

        } else {
            throw { response, message: 'cant book' };
        }
    } catch (error) {
        console.log(error.response.data.non_field_errors[0])
        swal({
            title: "Unable To Book!",
            text: error.response.data.non_field_errors[0],
            icon: "error",
        });
    }
}

