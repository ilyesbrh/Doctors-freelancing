import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

jQuery(document).ready(async () => {

    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    $('.doctor-profile-tab').append('<div id="loader"><div/>')

    let me = (await api.getDoctorProfile(id)).data;

    me.id = id;

    if (id) {
        $('#bookAppointment').show();
    }

    $('#name').text(me.name);
    $('#specialty').text(me.specialty);
    $('#bio').text(me.bio);
    $('#location').append('<i class="fas fa-map-marker-alt"></i> ' + me.state + ', ' + me.country);

    me.educations.forEach(e => {
        $("#education-experience").append(getEducationHtml(e));
    });
    me.experiences.forEach(e => {
        $("#work-experience").append(getWorkExperienceHtml(e));
    });
    me.services.forEach(element => {
        $('#services').append('<li><i class="material-icons">checkmark_alt</i> ' + element + '</li >');
    });
    me.specialization.forEach(element => {
        $('#specialization').append('<li><i class="material-icons">checkmark_alt</i> ' + element + '</li >');
    });

    $('#clinic-name').text(me.name);
    $('#clinic-location').text(me.state + ' - ' + me.country);
    $('#address_line1').text('Address: ' + me.address_line1);
    $('#address_line2').text('Second address: ' + me.address_line2);

    $('#today').text(moment().format('DD MMM YYYY'))
    me.working_hours.forEach(e => {
        $(".listing-hours").append(getHoursHtml(e));

        if (moment().toDate().getDay() === e.weekday) {
            $('#todayTiming').text(`${e.from_hour.slice(0, 5)} - ${e.to_hour.slice(0, 5)}`)
        }

    });

    me.reviews.forEach(e => {
        $(".comments-list").append(getReviewHtml(e));
    });

    $('#country').val(me.country);
    $('#birthday').val(me.birthday);
    $('#phone').val(me.phone);
    $('#gender').val(me.gender);
    $('#postal_code').val(me.postal_code);
    $('#pricing_type').val(me.pricing_type);
    $('#pricing').val(me.pricing);

    $("#loader").remove()
    $('.tab-content').removeClass('hidden')


    $('#book-btn').on('click', function () {

        location.href = 'add-appointment.html?doctor=' + JSON.stringify(me);
    });

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
function getWorkExperienceHtml(e) {
    return `
        <h5 class="list-title"><i class="material-icons">checkmark_alt</i>
            ${e.hospital_name}</h5>
        <span class="sub-title">${e.from_day} - ${e.to_day}</span>
    `;
}
function getEducationHtml(e) {
    return `
        <h5 class="list-title"><i class="material-icons">checkmark_alt</i>
            ${e.degree}</h5>
        <span class="sub-title">${e.institute}</span>
        <span class="sub-title">${e.year_of_completion}</span>
    `;
}
function getReviewHtml(e) {
    return `
    <li>
    <div class="comment">
        <img class="avatar avatar-sm rounded-circle" alt="User Image"
            src="assets/images/patients/patient2.jpg">
        <div class="comment-body">
            <div class="meta-data">
                <span class="comment-author">${e.patient_name}</span>
                <div class="review-count rating">
                <p style="margin-left: 5px; margin-bottom: -5px;"> ${e.stars} <i class="fas fa-star filled"></i> </p>
                </div>
            </div>
            <p class="comment-content">${e.comment}
            </p>
        </div>
    </div>
</li>
    `;
}