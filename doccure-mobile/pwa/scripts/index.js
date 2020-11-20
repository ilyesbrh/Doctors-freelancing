import authService from "../scripts/authServices.js";

var auth = new authService();

jQuery(document).ready(async function () {
    let user = await auth.getUser();

    if (user.data.role === 'patient') {
        window.location.href = 'patient-dashboard.html';
    } else {
        window.location.href = 'doctor-dashboard.html';
    }
});