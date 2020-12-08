import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();
var user;

jQuery(document).ready(async () => {

    $(".patient-appointments-col").append('<div id="loader"><div/>')

    user = (await auth.getUser()).data;

    let prescriptions = await api.getDoctorPrescriptions();

    console.log(prescriptions);

    $("#loader").remove();

    prescriptions.data.forEach((e, i) => {

        $(".patient-appointments-col").append(getPrescriptionHTML(e, i))

    });

    $(".prescription-btn").on("click", function () {
        $("#prescription-modal" + $(this).attr('id')).css("display", "block");
    })

    $(".close").on("click", function () {
        $(".modal").css("display", "none");
    })

});

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