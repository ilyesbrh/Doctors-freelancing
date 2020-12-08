import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

jQuery(document).ready(async () => {

    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    $('.doctor-profile-tab').append('<div id="loader"><div/>')
    let me = (await api.getPatientProfile(id)).data;

    console.log(me);

    $('#name').text(me.name);
    $('#gender').text('Gender - ' + me.gender);
    $('#blood_group').text('Blood group: ' + me.blood_group.toUpperCase());
    $('#address_line1').text(me.state + ', ' + me.country);
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

    $(".prescription-btn").on("click", function () {
        $("#prescription-modal" + $(this).attr('id')).css("display", "block");
    })

    $(".close").on("click", function () {
        $(".modal").css("display", "none");
    })

    $(".medical-record-btn").on("click", function () {
        $("#medical-record-modal" + $(this).attr('id')).css("display", "block");
    })

    $("#loader").remove()
    $('.container').removeClass('hidden')
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
                            <div class="status-col no-shadow">
                            <div class="status-btn">
                                <a href="#" id="${i}" class="btn view-eye medical-record-btn"><i><img src="assets/images/icon-awesome-eye.svg" alt=""></i>View</a>
                            </div>
                        </div>                           
                        </div>
                        <div id="medical-record-modal${i}" class="modal">

                        <!-- Modal content -->
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <h3 style="margin: 10px 0;">Medical Record</h3>
                            <h3 style="margin: 10px 0;">${e.title}</h3>
                            <p id="modal-content">${e.medical_record}</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>`
}

function getPrescriptionHTML(e, i) {
    let prescription = '';

    e.drugs.forEach((drug, i) => {

        prescription += `
        <h3 style="margin: 10px 0;">Medicament ${i+1}</h3>
        <p id="modal-content">Name: ${drug.name}</p>
        <p id="modal-content">Dosage: ${drug.dosage}</p>
        <p id="modal-content">for ${drug.days} days</p>
        <p id="modal-content">Directives: ${drug.directives}</p>
        `

    });


    return `<div class="patient-widget">
                <div class="patient-top-details">
                    <div>
                        <span class="invoice-id">PRE-${e.uid}</span>
                    </div>
                    <div>
                        <span class="date-col"> ${moment(e.created_time).format('DD MMM YYYY')}</span>
                    </div>
                </div>
                <div class="invoice-widget">
                    <div class="pat-info-left">
                        <div class="pat-info-cont">
                            <h4 class="pat-name"><a> ${e.patient_name}</a></h4>
                            <div class="patient-details-col">
                                <span class="">${e.doctor_specialty}</span>
                            </div>
                            <div class="status-col no-shadow">
                            <div class="status-btn">
                                <a href="#" id="${i}" class="btn view-eye prescription-btn"><i><img src="assets/images/icon-awesome-eye.svg" alt=""></i>View</a>
                            </div>
                        </div>                           
                        </div>
                        <div id="prescription-modal${i}" class="modal">

                        <!-- Modal content -->
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            ${prescription}
                        </div>

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
                            <span class="">Appt Date - ${moment(e.from_time).format('MMMM Do YYYY, h:mm a')}</span>
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