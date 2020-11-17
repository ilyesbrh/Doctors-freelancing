import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

jQuery(document).ready(async () => {


    let me = (await api.getPatientProfile()).data;

    $('#username').val(me.name);
    $('#phone').val(me.phone);
    $('#gender').val(me.gender);
    $('#blood_group').val(me.blood_group);
    $('#birthday').val(me.birthday);

    $('#bio').val(me.bio);

    $('#address_line1').val(me.address_line1);
    $('#address_line2').val(me.address_line1);
    $('#state').val(me.state);
    $('#country').val(me.country);
    $('#postal_code').val(me.postal_code);

});

$('.save-btn').on('click', (e) => {

    let me = {
        "name": $('#username').val(),
        "phone": $('#phone').val(),
        "gender": $('#gender').val(),
        "blood_group": $('#blood_group').val(),
        "bio": $('#bio').val(),
        "birthday": $('#birthday').val(),
        "address_line1": $('#address_line1').val(),
        "address_line2": $('#address_line2').val(),
        "state": $('#state').val(),
        "country": $('#country').val(),
        "postal_code": $('#postal_code').val()
    }

    debugger;
    try {
        let result = api.updateProfilePatient(me).then(v => {

            if (result) {
                location.href = 'patient-profile.html';
            }

        });

    } catch (e) {
        console.log(e);

    }
    return false;
});

