import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

jQuery(document).ready(async () => {


    let me = (await api.getDoctorProfile()).data;

});

$('#').on('click', async function () {


});

$('#').on('click', async function () {


});
