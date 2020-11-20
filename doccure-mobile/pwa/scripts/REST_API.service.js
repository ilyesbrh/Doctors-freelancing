import authService from "../scripts/authServices.js";

var auth = new authService();

export default class restService {

    constructor() { }

    async bookAppointment(data) {

        let result = await axios.post('appointments/', data);

        return result;
    }
    async getPatientProfile() {

        let result = await axios.get('patients/me');

        return result;
    }
    async updateProfilePatient(me) {
        let result = await axios.patch('patients/me', me);

        return result;
    }

    async getDoctorProfile(id) {

        if (id) {
            return await axios.get('doctors/' + id);
        } else {
            return await axios.get('doctors/me');
        }
    }

    async updateProfile(me) {
        let result = await axios.patch('doctors/me', me);

        return result;
    }

    async getDoctors(gender, specialty) {
        let result = await axios.get(`doctors/?gender=${gender ? gender : ''}&specialty=${specialty ? specialty : ''}`);

        return result;
    }

}