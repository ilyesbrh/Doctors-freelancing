import authService from "../scripts/authServices.js";

var auth = new authService();

jQuery(document).ready(function () {

});

$('#forgot-btn').on('click', async function () {
    $("#forgot-btn").text("Loading...");
    $("#forgot-btn").prop('disabled', true);

    let data = {
        phone: $('#phone').val(),
    }

    console.log(data);

    let response = await auth.resetPassword(data);

    console.log(response);

    if (response) {
        $('#forgot-btn').prop('disabled', true);
    }

    $("#forgot-btn").text("Send code");
    $("#forgot-btn").prop('disabled', false);

});

$('#confirm-btn').on('click', async function () {
    $("#confirm-btn").text("Loading...");
    $("#confirm-btn").prop('disabled', true);

    let data = {
        phone: $('#phone').val(),
        code: $('#code').val(),
        new_password: $('#password').val(),
    }

    console.log(data);

    let response = await auth.resetConfirm(data);

    console.log(response);

    if (response) {
        window.location.href = 'login.html';
    }

    $("#confirm-btn").text("Reset Password");
    $("#confirm-btn").prop('disabled', false);

});
