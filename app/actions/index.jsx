import axios from 'axios';

export function loginUser(username, token){
  return {
    type: "POST_LOGIN",
    username,
    token
  }
}

export function sendLoginRequest(username, password){
    return function(dispatch){
        return axios.post('http://localhost/login', {
            name: username,
            password: password
        })
        .then(function (response) {
             dispatch(loginUser(username, response.data.token));
        });
      
    }
}

export function sendRegisterRequest(username, email, password){
    return function(dispatch){
        return axios.post('http://localhost/register', {
            name: username,
            email: email,
            password: password
        })
        .then(function (response) {
            if(response.data.token){
                dispatch(loginUser(username, response.data.token));
            }
        });
    }
}

export function toggleLoginWindow(){
    return{
       type: "TOGGLE_LOGIN_WINDOW"
    }
}

export function toggleRegisterWindow(){
    return{
       type: "TOGGLE_REGISTER_WINDOW"
    }
}

export function toggleLogoutWindow(){
    return{
       type: "TOGGLE_LOGOUT_WINDOW"
    }
}

export function toggleCreatePlaylistWindow(){
    return{
       type: "TOGGLE_CREATE_PLAYLIST_WINDOW"
    }
}