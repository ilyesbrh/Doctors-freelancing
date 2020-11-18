import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

jQuery(document).ready(async () => {

    let me = (await api.getPatientProfile()).data;

    console.log(me);

    $('#name').text(me.name);
    $('#gender').text('Gender - ' + me.gender);
    $('#blood_group').text('Blood group: ' + me.blood_group.toUpperCase());
    $('#address_line1').text(me.address_line1);
    $('#phone').text(me.phone);

    $('#bio').text(me.bio);

    me.appointments.forEach((e, i) => {

        $(".patient-appointments-col.appointments").append(getAllBookingsHTML(e))
        /* only 10 */
        if (i < 9) $("#last-bookings").append(getLastBookingsHTML(e));
    });
    me.prescriptions.forEach((e, i) => {
        $(".patient-appointments-col.prescription").append(getPrescriptionHTML(e, i))
    });
    me.medical_records.forEach((e, i) => {
        $(".patient-appointments-col.medical_records").append(getMedicalRecordsHTML(e, i))
    });

});

function getMedicalRecordsHTML(e, i) {
    return `<div class="patient-widget">
                <div class="patient-top-details">
                    <div>
                        <span class="invoice-id">#MR-00${i}</span>
                    </div>
                    <div>
                        <span class="date-col">${moment(e.created_time).format('DD MMM YYYY')}</span>
                    </div>
                </div>
                <div class="invoice-widget">
                    <div class="pat-info-left">

                        <div class="pat-info-cont">
                            <h4 class="pat-name"><a href="doctor-profile.html?=${e.doctor}">${e.doctor_name}</a></h4>
                            <div class="patient-details-col">
                                <span class="">${e.doctor_specialty}</span>
                                <span class="filling">${e.title}</span>
                            </div>
                            <div class="download-pdf">
                                <a href="assets/images/logo.png" download>resume.pdf</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}

function getPrescriptionHTML(e, i) {
    return `<div class="patient-widget">
                <div class="patient-top-details">
                    <div>
                        <span class="invoice-id">Prescription ${i + 1}</span>
                    </div>
                    <div>
                        <span class="date-col"> ${moment(e.created_time).format('DD MMM YYYY')}</span>
                    </div>
                </div>
                <div class="invoice-widget">
                    <div class="pat-info-left">
                        <div class="pat-info-cont">
                            <h4 class="pat-name"><a href="doctor-profile.html?=${e.doctor}"> ${e.doctor_name}</a></h4>
                            <div class="patient-details-col">
                                <span class="">${e.doctor_specialty}</span>
                            </div>
                            <h4 style="margin-top:20px"> Details </h4>
                            <p>${e.prescription}</p>
                           
                        </div>
                    </div>
                </div>
            </div>`;
}

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
                                <span class="">${e.doctor_specialty}</span>
                            </div>
                            <div class="hour-col">
                                <div>
                                    <span class="hours">Appt Date - ${moment(e.from_time).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}
function getLastBookingsHTML(e) {
    return `<div class="mt-3">
                <h5 class="list-title mb-1"><i
                        class="material-icons">checkmark_alt</i> ${e.doctor_name}</h5>
                <span class="sub-title">${e.doctor_specialty}</span>
                <span class="sub-title">${moment(e.from_time).format('MMMM Do YYYY, h:mm:ss a')}</span>
            </div>`;
}