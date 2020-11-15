import authService from "../scripts/authServices.js";

var auth = new authService();
var phone;

jQuery(document).ready(function () {


});

$('#login-btn').on('click', async function () {

    let data = {
        code: $('#phone').val(),
        password: $('#password').val(),

    }

    console.log(data);

    let response = await auth.login(data);

    if (response) {

        auth.saveJwt(response);

        let user = await auth.getUser();

        if (user.role === 'patient') {
            window.location.href = 'template/search-doctor.html';
        } else {
            window.location.href = 'template/doctor-dashboard.html';
        }
    }

});
