import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

jQuery(document).ready(async () => {

    $(".doctors-list").append('<div id="loader"><div/>')
    let doctors = await api.getDoctors('', '');
    console.log(doctors.data);
    $("#loader").remove()

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
                <h4 class="doc-name"><a href="doctor-profile.html?id=${e.id}">${e.name}</a></h4>
                <p class="doc-speciality">${e.specialty.charAt(0).toUpperCase() + e.specialty.slice(1)}</p>
                <br>
                <div class="doc-info">
					<div class="rating">
					    <span class="d-inline-block average-rating">${e.gender.charAt(0).toUpperCase() + e.gender.slice(1)}</span>
					</div>
				    <div class="doc-location">
					    <p><i class="fas fa-map-marker-alt"></i> ${e.state + ', ' + e.country}</p>
					</div>
				</div>
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

$('#search').on("click", async function (e) {
    e.preventDefault()

    let gender = $('#gender').val();
    let specialty = $('#specialty').val();

    $(".doctors-list").empty()
    $(".doctors-list").append('<div id="loader"><div/>')
    let doctors = await api.getDoctors(gender, specialty);
    console.log(doctors.data);
    $("#loader").remove()

    doctors.data.forEach((e, i) => {

        $(".doctors-list").append(getDoctorWidgetHTML(e))

    });
});