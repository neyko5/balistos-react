import axios from 'axios';

export function loginUser(username, token){
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    return {
        type: "POST_LOGIN",
        username,
        token
    }
}

export function setAuthFromStorage(){
    if(localStorage.getItem("token") && localStorage.getItem("username")){
        return {
            type: "AUTH_SET_FROM_STORAGE",
            token: localStorage.getItem("token"),
            username: localStorage.getItem("username")
        }
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

export function setMessages(messages){
    return{
        type: "SET_MESSAGES",
        messages: messages
    }
}

export function fetchMessages(){
    return function(dispatch){
        return axios.get('http://localhost/chat')
        .then(function (response) {
            if(response.data.messages){
                dispatch(setMessages(response.data.messages));
            }
        });
    }
}

export function fetchVideos(){
    return function(dispatch){
        return axios.get('http://localhost/',{})
            .then(function (response) {
                if(response.data){
                    dispatch(setVideos(response.data));
                }
            });
    }
}

export function searchYoutube(query){
    console.log("inside", query);
    return function(dispatch){
        return axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                q: query,
                key: "AIzaSyA0SUe7isd62Q2wNqHMAG91VFQEANrl7a0",
                part: "snippet"
            }

        }).then(function (response) {
            dispatch(setResultsYoutube(response.data.items));
        });
    }
}

export function setResultsYoutube(results){
    return {
        type: "SET_RESULTS",
        results: results
    }
}

export function addItem(id){
    console.log("id", id);
    return {
        type: "ADD_ITEM",
        results: id
    }
}

export function setVideos(videos){
    return{
        type: "SET_VIDEOS",
        videos: videos
    }
}

export function receiveRawMessage(msg){
    return{
        type: "RECIEVE_MESSAGE",
        message: msg
    }
}

export function logOut(){
    return{
        type: "LOG_OUT"
    }
}

export function changePlaylist(playlist){
    console.log(playlist);
    return {
        type: "CHANGE_PLAYLIST",
        playlist: playlist
    }
}

export function sendMessage(message, playlist_uri){
    return function(dispatch){
        return axios.post('http://localhost/message/' + playlist_uri, {
            message: message,
            playlist_uri: playlist_uri
        })
        .then(function (response) {
            if(response.data.message){
                dispatch(setMessage(message));
            }
        });
    }
    return{
        type: "SEND_MESSAGE",
        message: message,
        playlist_uri: playlist_uri
    }
}

export function setMessage(message){
    return{
        type: "SET_MESSAGE",
        message: message
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