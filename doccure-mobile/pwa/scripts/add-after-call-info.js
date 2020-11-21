import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

var id;

var prescription = false;

jQuery(document).ready(function () {

    let params = new URLSearchParams(window.location.search);
    id = params.get("id");

});

$('#login-btn').on('click', function () {

    afterCallInfo().then();

    return false;

});
async function afterCallInfo() {

    let data = {
        title: $('#title').val(),
        description: $('#description').val(),
    };

    console.log(data);

    try {

        let response = prescription ?
            (await api.addPrescription(id, { title: $('#title').val(), medical_record: $('#description').val() })) :
            (await api.addMedicalRecord(id, { prescription: $('#description').val() }));

        if (response) {

            console.log('[RESPONSE]');
            console.log(response);

            if (prescription) {

                await swal({
                    title: "Sent successfully!",
                    text: 'Thank you for your time ',
                    icon: "success",
                });

                location.href = 'index.html';
            } else {

                prescription = true;

                $('#name').text('Prescription');

                $('#title').parent().hide();
                $('#description').val('');

                swal({
                    title: "Sent successfully!",
                    text: 'now fill prescription',
                    icon: "success",
                });

            }

        } else {
            throw { response, message: 'cant book' };
        }
    } catch (error) {
        swal({
            title: "Something wrong happens!",
            text: 'try again :)',
            icon: "error",
        });
    }

}
