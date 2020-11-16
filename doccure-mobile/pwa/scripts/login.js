import authService from "../scripts/authServices.js";

var auth = new authService();

jQuery(document).ready(function () {


});

$('#login-btn').on('click', async function () {

    let data = {
        phone: $('#phone').val(),
        password: $('#password').val(),
    }

    console.log(data);

    let response = await auth.login(data);

    if (response) {

        let user = await auth.getUser();

        if (user.role === 'patient') {
            window.location.href = 'index.html';
        } else {
            window.location.href = 'doctor-dashboard.html';
        }
    }

});
