import authService from "../scripts/authServices.js";

var auth = new authService();
var phone;

jQuery(document).ready(function () {

    let params = new URLSearchParams(window.location.search);
    phone = params.get("phone");


});

$('#confirm-btn').on('click', async function () {

    let data = {
        code: $('#code').val(),
        phone: phone
    }

    console.log(data);

    let response = await auth.confirmAccount(data);

    console.log(response);

    if (response) {

        window.location.href = 'login.html';
    }

});
