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

$('.btn-submit').on('click', function () {
    afterCallInfo().then();
    return false;
});

// $('.trash-icon').on('click', function (event) {
//     console.log($(event.target))
//     $(event.btn-submittarget).parent().parent().remove();
// });

async function afterCallInfo() {
    let response;

    try {

        if (prescription) {
            let drugs = [];
            jQuery.each($('.awards-details'), function (key, value) {
        
                let v = {
                    name: $(value).find('input')[0].value,
                    dosage: $(value).find('input')[1].value,
                    days: $(value).find('input')[2].value,
                    directives: $(value).find('input')[3].value
                };
        
                drugs.push(v);
            });
            
            response = await api.addPrescription(id, { drugs: drugs });

        } else {
            response = await api.addMedicalRecord(id, { title: $('#title').val(), medical_record: $('#description').val() });
        }

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

                $('#medical_record').hide();
                $('#prescription').show();

                swal({
                    title: "Sent successfully!",
                    text: 'now fill the prescription',
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
