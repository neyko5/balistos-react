import {expireSession} from "../actions";
import axios from 'axios';

axios.defaults.baseURL = 'http://balistos-api.mtgslo.si';

axios.interceptors.request.use(function (config) {
    if(localStorage.getItem("token")){
        config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
    }
    return config;
});

axios.interceptors.response.use(null, function(err) {
    if ( err.response && (err.response.status === 401 || err.response.status === 403 )) {
        return Promise.reject({type: "EXPIRE_SESSION"});
    }
    return Promise.reject(err);

});

module.exports=axios;