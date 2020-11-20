import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();
var user;

jQuery(document).ready(async () => {

    $(".patient-appointments-col").append('<div id="loader"><div/>')

    user = (await auth.getUser()).data;

    let appointments = user.role === 'doctor' ? (await api.getDoctorAppointments()) : (await api.getPatientAppointments());

    console.log(appointments);

    $("#loader").remove();

    appointments.data.forEach((e, i) => {

        $(".patient-appointments-col").append(getAllBookingsHTML(e))

    });

});

function getAllBookingsHTML(e) {
    let button = `<div class="status-btn">
                    <a href="" class="btn print"><i><img src="assets/images/icon-time.svg" alt=""></i>Not ready yet</a>
                </div>`

    if (moment().isAfter(e.from_time)) {
        button = `<div class="status-btn">
                    <a href="video-call.html?id=${e.id}" class="btn success"><i><img src="assets/images/icon-checkmark.svg" alt=""></i>Join Now</a>
                </div>`
    }

    let profile = `<h4 class="pat-name">Doctor <a href="doctor-profile.html?id=${e.doctor_id}">${e.doctor_name}</a></h4>`
    
    if (user.role === 'doctor') {
        profile = `<h4 class="pat-name">Patient <a href="patient-profile.html?id=${e.patient_id}">${e.patient_name}</a></h4>`
    }

    return `<div class="patient-widget">
                <div class="patient-top-details">
                    <div>
                        <span class="invoice-id"><strong>Booking Date</strong> - ${moment(e.created_time).format('DD MMM YYYY')}</span>
                    </div>
                    <div>
                        <span class="date-col">${e.doctor_specialty}</span>
                    </div>
                </div>
                <div class="invoice-widget">
                    <div class="pat-info-left">
                        <div class="pat-info-cont">
                        ${profile}
                            <div class="patient-details-col">
                            <span class="">Appt Date - ${moment(e.from_time).format('MMMM Do YYYY, h:mm a')}</span>
                        </div>
                    </div>
                </div>
                    </div>
                    <div class="status-col">
                        ${button}
                    </div>
                </div>
            </div>`;
}