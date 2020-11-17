import authService from "../scripts/authServices.js";

var auth = new authService();

export default class restService {

    constructor() { }

    async getPatientProfile() {

        let result = await axios.get('patients/me');

        return result;
    }
    async updateProfilePatient(me) {
        let result = await axios.patch('patients/me', me);

        return result;
    }

    async getDoctorProfile() {

        let result = await axios.get('doctors/me');

        return result;
    }

    async updateProfile(me) {
        let result = await axios.patch('doctors/me', me);

        return result;
    }

}