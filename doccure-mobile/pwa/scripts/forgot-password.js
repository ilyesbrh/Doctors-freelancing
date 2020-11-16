import authService from "../scripts/authServices.js";

var auth = new authService();

jQuery(document).ready(function () {

});

$('#forgot-btn').on('click', async function () {

    let data = {
        phone: $('#phone').val(),
    }

    console.log(data);

    let response = await auth.resetPassword(data);

    console.log(response);

    if (response) {
        $('#forgot-btn').prop('disabled', true);
    }

});

$('#confirm-btn').on('click', async function () {

    let data = {
        phone: $('#phone').val(),
        code: $('#code').val(),
        password: $('#password').val(),
    }

    console.log(data);

    let response = await auth.resetPassword(data);

    console.log(response);

    if (response) {

        window.location.href = 'login.html';
    }

});
