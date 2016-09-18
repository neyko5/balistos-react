import axios from 'axios';
import { browserHistory } from 'react-router'

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

export function createPlaylist(title, description){
  console.log(title, description);
  return function(dispatch){
      return axios.post('http://localhost/playlist',
          {
              title: title,
              description: description
          },
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("token")
            },

          }
      ).then(function (response) {
          if(response.data.uri){
              dispatch(redirectToPlaylist(response.data.uri));
          }
      }.bind(this));
  }
}

export function redirectToPlaylist(uri){
     console.log("redirect", uri)
     browserHistory.push('/playlist/' + uri);
}

export function sendLoginRequest(username, password){
    return function(dispatch){
        return axios.post('http://localhost/login', {
            username: username,
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
            username: username,
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

export function fetchPlaylist(){
    return function(dispatch){
        return axios.get('http://localhost/playlist/sample',{})
            .then(function (response) {
                if(response.data){
                    dispatch(setIntialPlaylistData(response.data));
                }
            });
    }
}

export function searchYoutube(query){
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

export function addVideo(id, title){
  return axios.get('http://localhost/video/add', {
      params: {
          title: title,
          id: id
      }
  }).then(function (response) {
      dispatch(setResultsYoutube(null));
  });
}

export function setIntialPlaylistData(data){
    return{
        type: "SET_INITIAL_PLAYLIST_DATA",
        videos: data.videos,
        messages: data.messages
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

export function searchPlaylists(query){
    return function(dispatch){
        return axios.get('http://localhost/playlists?q=' + query, {
               headers: {
                 'Authorization': 'Bearer ' + localStorage.getItem("token")
               }
            }
        ).then(function (response) {
            if(response.data.playlists){
                dispatch(setPlaylistResults(response.data.playlists));
            }
        }.bind(this));
    }
}

export function setPlaylistResults(playlists){
    return {
        type: "SET_PLAYLIST_RESULTS",
        results: playlists
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
