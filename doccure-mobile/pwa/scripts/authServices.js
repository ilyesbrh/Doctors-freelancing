
export default class authService {

    API_LINK = 'https://doccure-backend.herokuapp.com/api/v1/';


    constructor() {
        axios.defaults.baseURL = this.API_LINK;
        // Request interceptor for API calls
        axios.interceptors.request.use(
            async config => {
                config.headers = {
                    'Authorization': this.getJwt() ? `Bearer ${this.getJwt()}` : null,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                return config;
            },
            error => {
                Promise.reject(error)
            });

        // Response interceptor for API calls
        axios.interceptors.response.use((response) => {
            return response
        }, async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const access_token = await this.refreshAccessToken();
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                } catch (e) {
                    console.log(e);
                }
                return axios(originalRequest);
            }
            return Promise.reject(error);
        });
    }

    async login(data) {

        let result = await axios.post('/auth/signin/', data);

        this.setJwt(result.data.access);
        this.setRefresh(result.data.refresh);

        return result;
    }

    async register(data) {

        let result = await axios.post('/auth/signup/', data);

        console.log(result);

        return result;
    }

    async getUser() {
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

    async refreshAccessToken() {

        let result = await axios.post('/auth/token/refresh/', { refresh: this.getRefresh() });

        this.setJwt(result.data.access);

        return result.data.access;

    }

    getJwt() {
        return localStorage.getItem('JWT_TOKEN');
    }

    setJwt(jwt) {
        localStorage.setItem('JWT_TOKEN', jwt);
    }

    getRefresh() {
        return localStorage.getItem('JWT_REFRESH');
    }

    setRefresh(refresh) {
        localStorage.setItem('JWT_REFRESH', refresh);
    }



}