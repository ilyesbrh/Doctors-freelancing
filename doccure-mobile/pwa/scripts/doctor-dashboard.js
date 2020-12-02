import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

jQuery(document).ready(async () => {
    $('.page-content').append('<div id="loader"></div>')

    let me = (await api.getDoctorProfile()).data;

    $('#name').text(me.name);
    $('#specialty').text(me.specialty);
    $('#gender').text(me.gender);
    $('#location').append('<p><i class="fas fa-map-marker-alt"></i> ' + me.state + ', ' + me.country + '</p>');
    $('#prescriptions-count').text(me.prescriptions_count);
    $('#patients-count').text(me.patients_count);

    $("#loader").remove()
    $('.patient-details').removeClass('hidden')
});

$('#patients').on('click', async function () {
    window.location.href = 'patients-list.html'
});

$('#prescriptions').on('click', async function () {
    window.location.href = 'doctor-prescriptions.html'
});

