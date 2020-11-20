import authService from "../scripts/authServices.js";

var auth = new authService();

jQuery(document).ready(function () {

});

$('#register-btn').on('click', async function () {
    $("#register-btn").text("Loading...");
    $("#register-btn").prop('disabled', true);

    let data = {
        name: $('#name').val(),
        password: $('#password').val(),
        role: $('#role').val(),
        phone: $('#phone').val(),
    }

    console.log(data);

    let response = await auth.register(data);

    if (response) {

        var params = new URLSearchParams();
        params.append("phone", data.phone);

        window.location.href = 'confirm-account.html?' + params.toString();
    }

    $("#register-btn").text("Register");
    $("#register-btn").prop('disabled', false);
});
