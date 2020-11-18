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

    save().then();
    return false;
});

async function save() {
    let bd = moment($('#birthday').val()).format('YYYY-MM-DD');

    let me = {
        "name": $('#username').val(),
        "phone": $('#phone').val(),
        "gender": $('#gender').val(),
        "blood_group": $('#blood_group').val(),
        "bio": $('#bio').val(),
        "birthday": bd,
        "address_line1": $('#address_line1').val(),
        "address_line2": $('#address_line2').val(),
        "state": $('#state').val(),
        "country": $('#country').val(),
        "postal_code": $('#postal_code').val()
    };

    try {
        let result = await api.updateProfilePatient(me);

        if (result) {
            await swal({
                title: "Updated successfully!",
                text: "",
                icon: "info",
            });
            location.href = 'patient-profile.html';
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

