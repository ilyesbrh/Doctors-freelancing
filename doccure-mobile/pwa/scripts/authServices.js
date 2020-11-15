
export default class authService {

    API_LINK = 'http://doccure-backend.herokuapp.com/api/v1/';


    constructor() {
        axios.defaults.baseURL = this.API_LINK;
        axios.defaults.headers.common['Authorization'] = this.loadJwt();
        axios.defaults.headers.post['Content-Type'] = 'application/JSON';
    }

    async login(data) {

        let result = await axios.post('/auth/signin/', data);

        console.log(result);

        return result;
    }

    async register(data) {

        let result = await axios.post('/auth/signup/', data);

        console.log(result);

        return result;
    }

    async getUser(data) {
        let result = await axios.get('/auth/user/');

        return result;
    }

    async confirmAccount(data) {
        let result = await axios.post('/auth/confirm/', data);

        return result;
    }
    async resetPassword(data) {
        let result = await axios.post('/auth/password/reset/', data);

        return result;
    }
    async resetConfirm(data) {
        let result = await axios.post('/auth/password/reset/confirm/', data);

        return result;
    }

    loadJwt() {
        return localStorage.getItem('JWT_TOKEN');
    }

    saveJwt(jwt) {
        localStorage.setItem('JWT_TOKEN', jwt);

        axios.defaults.headers.common['Authorization'] = this.loadJwt();
    }

}