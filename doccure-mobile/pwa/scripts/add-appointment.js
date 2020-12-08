import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

var id, name;

jQuery(document).ready(async function () {

    $('.page-content').append('<div id="loader"><div/>')

    let params = new URLSearchParams(window.location.search);
    id = params.get("id");
    
    let me = (await api.getDoctorProfile(id)).data;
    name = me.name

    $('#name').text(name);
    $('#question').text(me.question);

    jQuery.datetimepicker.setLocale('fr');

    jQuery('#date').datetimepicker(
        {
            minDate: moment().toDate(),
            maxDate: moment().add(20, 'days').toDate(),
            format: 'm-d-Y H:i'
        }
    );

    me.working_hours.forEach(e => {
        $(".listing-hours").append(getHoursHtml(e));

        if (moment().toDate().getDay() === e.weekday) {
            $('#todayTiming').text(`${e.from_hour.slice(0, 5)} - ${e.to_hour.slice(0, 5)}`)
        }

    });

    $("#loader").remove()
    $('.list').removeClass('hidden')
});

function getHoursHtml(e) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return `
    <div class="listing-day">
        <div class="day"><i class="check-icon-black"></i> ${days[e.weekday]}</div>
        <div class="time-items">
            <span class="time">${e.from_hour.slice(0, 5)} - ${e.to_hour.slice(0, 5)}</span>
        </div>
    </div>
    `
}

$('#login-btn').on('click', function () {

    bookAppointment().then();

    return false;

});
async function bookAppointment() {
    $("#login-btn").text("Loading...");
    $("#login-btn").prop('disabled', true);
    
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

            location.href = 'booking-success.html?data=' + JSON.stringify({ name: name, time: $('#date').val() });

        } else {
            throw { response, message: 'cant book' };
        }
    } catch (error) {
        let theError = error.response.data.non_field_errors ? error.response.data.non_field_errors[0] : 'Select a time'
        
        swal({
            title: "Unable To Book!",
            text: theError,
            icon: "error",
        });
    }

    $("#login-btn").text("Book Now");
    $("#login-btn").prop('disabled', false);
}
