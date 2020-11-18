import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

jQuery(document).ready(async () => {

    let params = new URLSearchParams(window.location.search);
    let gender = params.get("gender");
    let specialty = params.get("specialty");

    let doctors = await api.getDoctors(gender, specialty);

    console.log(doctors.data);

    doctors.data.forEach((e, i) => {

        $(".doctors-list").append(getDoctorWidgetHTML(e))

    });

});

function getDoctorWidgetHTML(e) {
    return `
    <div class="doctor-widget">
        <div class="doc-info-left">
            <div class="doctor-img">
                <a href="doctor-profile.html">
                    <img src="assets/images/doctors/doctor-thumb-01.jpg" class="img-fluid"
                        alt="User Image">
                </a>
            </div>
            <div class="doc-info-cont">
                <style>
                .doc-gender{
                    position: absolute;
                    right: 14px;
                    top: 14px;
                    font-size: 20px;
                    font-weight:600;
                }
                </style>
                <h4 class="doc-name"><a href="doctor-profile.html?id=${e.id}">${e.name}</a></h4>
                <p class="doc-speciality">${e.state + ', ' + e.country}</p>
                <span class="doc-gender">${e.gender.toUpperCase()}</span>
                <h5 class="doc-department">
                    <span class="speciality-img"><img
                            src="assets/images/specialities/specialities-01.png"
                            class="img-fluid" alt="Speciality"></span> ${e.specialty}
                </h5>
            </div>
        </div>
        <div class="doc-info-right">
            <div class="clinic-booking">
                <div class="clinic-btn">
                    <a class="apt-btn" href="doctor-profile.html?id=${e.id}">Book Appointment</a>
                </div>
            </div>
        </div>
    </div>`
}