import authService from "../scripts/authServices.js";

var auth = new authService();

jQuery(document).ready(function () {


});

$('#login-btn').on('click', async function () {
    $("#login-btn").text("Loading...");
    $("#login-btn").prop('disabled', true);

    let data = {
        phone: $('#phone').val(),
        password: $('#password').val(),
    }

    console.log(data);

    try {

        let response = await auth.login(data);

        if (response) {

            let user = await auth.getUser();

            await swal({
                title: "Welcome!",
                text: "You logged in successfully.",
                icon: "success",
            });

            if (user.data.role === 'patient') {

                localStorage.setItem('user_type', 'patient');

                window.location.href = 'patient-dashboard.html';
            } else {

                localStorage.setItem('user_type', 'doctor');
                window.location.href = 'doctor-dashboard.html';
            }
        }
    } catch (error) {

        swal({
            title: "Can't Log in!",
            text: "Please verify your inputs!",
            icon: "error",
        });
    }

    $("#login-btn").text("Login Now");
    $("#login-btn").prop('disabled', false);

});
