import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

jQuery(document).ready(async () => {

    $(".patient-appointments-col").append('<div id="loader"><div/>')

    let user = (await auth.getUser()).data;

    let appointments = user.role === 'doctor' ? (await api.getDoctorAppointments()) : (await api.getPatientAppointments());

    console.log(appointments);

    $("#loader").remove();

    appointments.data.forEach((e, i) => {

        $(".patient-appointments-col").append(getAllBookingsHTML(e))

    });

});

function getAllBookingsHTML(e) {
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
                            <h4 class="pat-name"><a href="doctor-profile.html?id=${e.doctor}">${e.doctor_name}</a></h4>
                            <div class="patient-details-col">
                            <span class="">Appt Date - ${moment(e.from_time).format('MMMM Do YYYY, h:mm a')}</span>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}