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


                window.location.href = 'index.html';
            } else {

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

});
