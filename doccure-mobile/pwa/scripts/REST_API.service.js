import authService from "../scripts/authServices.js";

var auth = new authService();


export default class authService {

    API_LINK = 'http://doccure-backend.herokuapp.com/api/v1/';

    constructor() {
        axios.defaults.baseURL = this.API_LINK;
        axios.defaults.headers.common['Authorization'] = auth.loadJwt();
        axios.defaults.headers.post['Content-Type'] = 'application/JSON';
    }


}