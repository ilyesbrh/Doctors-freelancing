import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();
var user;

jQuery(document).ready(async () => {

    $(".patients-list").append('<div id="loader"><div/>')

    user = (await auth.getUser()).data;

    let patients = await api.getDoctorPatients();

    console.log(patients);

    $("#loader").remove();

    patients.data.forEach((e, i) => {

        $(".patients-list .container").append(getPatientHTML(e))

    });

});

function getPatientHTML(e) {
    return `<div class="patient-widget">		
                <div class="patient-top-details">
                    <div>
                        <span>Patient ID - PT${e.id}</span>
                    </div>
                    <div>
                        <span><i class="fas fa-map-marker-alt"></i> ${e.state}, ${e.country}</span>
                    </div>
                </div>	
                <div class="pat-info-left">
                    <div class="patient-img">
                        <a href="patient-profile.html">
                            <img src="assets/images/patients/patient4.jpg" class="img-fluid" alt="User Image">
                        </a>
                    </div>
                    <div class="pat-info-cont">
                        <h4 class="pat-name"><a href="patient-profile.html?id=${e.id}">${e.name}</a></h4>
                        <div class="patient-details-col">
                            <span>${e.gender}</span>
                            <span>Blood Group - ${e.blood_group.toUpperCase()}</span>
                        </div>
                        <div class="pat-contact">
                            <span class="icon-phone">
                                <i class="fas fa-phone"></i>
                            </span>
                            <span>${e.phone}</span>
                        </div>
                    </div>
                </div>
            </div>`;
}