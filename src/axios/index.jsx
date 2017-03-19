import axios from 'axios';
import {API_INDEX} from '../settings';

axios.defaults.baseURL = API_INDEX;

axios.interceptors.request.use(function (config) {
    if(localStorage.getItem("token")){
        config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
    }
    return config;
});

module.exports = axios;