import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

jQuery(document).ready(async () => {

    $('.container').append('<div id="loader"><div/>')

    let me = (await api.getDoctorProfile()).data;

    $('#username').val(me.name);
    $('#phone').val(me.phone);
    $('#gender').val(me.gender);
    $('#specialty').val(me.specialty);
    $('#birthday').val(me.birthday);

    $('#bio').val(me.bio);

    $('#address_line1').val(me.address_line1);
    $('#address_line2').val(me.address_line1);
    $('#state').val(me.state);
    $('#country').val(me.country);
    $('#postal_code').val(me.postal_code);

    $('#pricing_type').val(me.pricing_type);
    $('#pricing').val(me.pricing);

    me.services.forEach(element => {
        $('#profileCard').append('<li><div class="form-group">' + element + '<span class="close-icon"></span></div></li>');
    });
    me.specialization.forEach(element => {
        $('#profileCard1').append('<li><div class="form-group">' + element + '<span class="close-icon"></span></div></li>');
    });

    me.educations.forEach(e => {
        $(".education-experience form").append(getEducationHtml(e));
    });
    me.experiences.forEach(e => {
        $(".work-experience form").append(getExperienceHtml(e));
    });
    me.working_hours.forEach(e => {
        $(".hours-col form").append(getHoursHtml(e));
    });

    onClearList();
    onClearForm();

    $("#loader").remove()
    $('.tab-content').removeClass('hidden')

});

function getEducationHtml(e) {
    return `<ul class="education-details">
            <li class="item-content item-input trash-icon-for-tab">
                <span class="trash-icon"></span>
            </li>
            <li class="item-content item-input col-50 gender">
                <div class="item-col">
                    <div class="item-title item-label">Degree</div>
                    <div class="item-input-wrap">
                        <input value="${e.degree}" type="text">
                    </div>
                </div>
            </li>
            <li class="item-content item-input col-50 dob">
                <div class="item-col">
                    <div class="item-title item-label">Year of Completion</div>
                    <div class="item-input-wrap">
                        <input value="${e.year_of_completion}" type="text">
                    </div>
                </div>
            </li>
            <li class="item-content item-input">
                <div class="item-col">
                    <div class="item-title item-label">College/Institute</div>
                    <div class="item-input-wrap">
                        <input value="${e.institute}" type="text">
                    </div>
                </div>
            </li>
        </ul>`

}
function getExperienceHtml(e) {
    return `<ul class="work-experience-col">
            <li class="item-content item-input trash-icon-for-tab">
                <span class="trash-icon"></span>
            </li>
            <li class="item-content item-input">
                <div class="item-col">
                    <div class="item-title item-label">Hospital Name</div>
                    <div class="item-input-wrap">
                        <input type="text" value="${e.hospital_name}">
                    </div>
                </div>
            </li>
            <li class="item-content item-input col-50 gender">
                <div class="item-col">
                    <div class="item-title item-label">From</div>
                    <div class="item-input-wrap date-picker-col">
                        <input class="datepicker" type="text" name="date" value="${e.from_day}" data-select="datepicker" >
                        <span class="calendar-icon"><img src="assets/images/icon-metro-calendar-big.svg" alt=""></span>
                    </div>

                </div>
            </li>
            <li class="item-content item-input col-50 dob">
                <div class="item-col">
                    <div class="item-title item-label">To</div>
                    <div class="item-input-wrap date-picker-col">
                        <input class="datepicker" type="text" name="date" value="${e.to_day}" data-select="datepicker" >
                        <span class="calendar-icon"><img src="assets/images/icon-metro-calendar-big.svg" alt=""></span>
                    </div>
                </div>
            </li>
        </ul>`

}
function getHoursHtml(e) {
    return `<ul class="hours-item-col">
                <li class="item-content item-input trash-icon-for-tab">
                    <span class="trash-icon"></span>
                </li>
                <li class="item-content item-input">
                    <div class="item-col">
                        <div class="item-title item-label">Day</div>
                        <div class="item-input-wrap input-dropdown-wrap">
                            <select>
                                <option value="1" ${e.weekday === 1 ? 'selected' : ''}>Monday</option>
                                <option value="2" ${e.weekday === 2 ? 'selected' : ''}>Tuesday</option>
                                <option value="3" ${e.weekday === 3 ? 'selected' : ''}>Wednesday</option>
                                <option value="4" ${e.weekday === 4 ? 'selected' : ''}>Thursday</option>
                                <option value="5" ${e.weekday === 5 ? 'selected' : ''}>Friday</option>
                                <option value="6" ${e.weekday === 6 ? 'selected' : ''}>Saturday</option>
                                <option value="7" ${e.weekday === 7 ? 'selected' : ''}>Sunday</option>
                            </select>
                        </div>
                    </div>
                </li>
                <li class="item-content item-input col-50 gender">
                    <div class="item-col">
                        <div class="item-title item-label">From</div>
                        <div class="item-input-wrap date-picker-col">
                            <input type="text" name="date" value="${e.from_hour}"
                                pattern="'\d\d:\d\d:\d\d" placeholder="xx:xx:xx">
                            <span class="calendar-icon"><img
                                    src="assets/images/icon-metro-calendar-big.svg"
                                    alt=""></span>
                        </div>
                    </div>
                </li>
                <li class="item-content item-input col-50 dob">
                    <div class="item-col">
                        <div class="item-title item-label">To</div>
                        <div class="item-input-wrap date-picker-col">
                            <input type="text" name="date" value="${e.to_hour}"
                                pattern="'\d\d:\d\d:\d\d" placeholder="xx:xx:xx">
                            <span class="calendar-icon"><img
                                    src="assets/images/icon-metro-calendar-big.svg"
                                    alt=""></span>
                        </div>
                    </div>
                </li>
            </ul>`
}

//Append div Hours
$('.hours-col span.add-btn').on('click', function () {
    $(".hours-col form").append(getHoursHtml({ weekday: '', from_hour: '', to_hour: '' }));
    onClearForm();
});

//Append div education
$('.education-experience span.add-btn').on('click', function () {
    $(".education-experience form").append(getEducationHtml({ degree: '', year_of_completion: '', institute: '' }));
    onClearForm();
});

//Append div work experience
$('.work-experience span.add-btn').on('click', function () {
    $(".work-experience form").append(getExperienceHtml({ hospital_name: '', from_day: '', to_day: '' }));
    onClearForm();
});


//Click trash remove div
function onClearForm() {
    $('ul li span.trash-icon').on('click', function () {
        $(this).parent().parent().remove();
    });
}

//Clear Input Item list
function onClearList() {
    $('.form-group span.close-icon').on('click', function () {
        $(this).parent().parent().remove();
    });
}

$('.save-btn').on('click', (e) => {

    /* getting services list */
    save().then();
    return false;
});

async function save() {
    let services = [];
    jQuery.each($('#profileCard>li>div'), function (key, value) {
        services.push(value.innerText);
    });
    /* getting services list */
    let Specialization = [];
    jQuery.each($('#profileCard1>li>div'), function (key, value) {
        Specialization.push(value.innerText);
    });

    /* getting education list */
    let educations = [];
    jQuery.each($('.education-experience form .education-details'), function (key, value) {

        let v = {
            degree: $(value).find('input')[0].value,
            year_of_completion: $(value).find('input')[1].value,
            institute: $(value).find('input')[2].value
        };

        educations.push(v);
    });
    /* getting workExperience list */
    let workExperiences = [];
    jQuery.each($('.work-experience form .work-experience-col'), function (key, value) {

        let v = {
            hospital_name: $(value).find('input')[0].value,
            from_day: $(value).find('input')[1].value,
            to_day: $(value).find('input')[2].value
        };

        workExperiences.push(v);
    });

    /* getting working hours list */
    let working_hours = [];
    jQuery.each($('.hours-col form .hours-item-col'), function (key, value) {

        let v = {
            weekday: $(value).find('select')[0].value,
            from_hour: $(value).find('input')[0].value,
            to_hour: $(value).find('input')[1].value
        };

        working_hours.push(v);

    });

    let pricing = $('#pricing').val() == '' ? null : $('#pricing').val()

    let me = {
        "name": $('#username').val(),
        "phone": $('#phone').val(),
        "gender": $('#gender').val(),
        "specialty": $('#specialty').val(),
        "bio": $('#bio').val(),
        "birthday": $('#birthday').val(),
        "address_line1": $('#address_line1').val(),
        "address_line2": $('#address_line2').val(),
        "state": $('#state').val(),
        "country": $('#country').val(),
        "postal_code": $('#postal_code').val(),
        "pricing": pricing,
        "pricing_type": $('#pricing_type').val(),
        "services": [...services],
        "specialization": [...Specialization],
        "working_hours": [...working_hours],
        "educations": [...educations],
        "experiences": [...workExperiences],
        "reviews": []
    };

    try {
        let result = await api.updateProfile(me);

        if (result) {

            await swal({
                title: "Updated successfully!",
                text: "",
                icon: "info",
            });

            location.href = 'doctor-profile.html';
        } else {
            await swal({
                title: "Can't Log in!",
                text: "Please verify your inputs!",
                icon: "error",
            });
        }

    } catch (e) {
        console.log(e);
        await swal({
            title: "Can't Log in!",
            text: "Please verify your inputs!",
            icon: "error",
        });
    }
}

