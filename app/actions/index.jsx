import axios from 'axios';
import {browserHistory} from 'react-router';
import {store} from "../index";

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(function (config) {
  if(localStorage.getItem("token")){
      config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
  }
  return config;
});

axios.interceptors.response.use(null, function(err) {
  if ( err.response && err.response.status === 403 ) {
      localStorage.clear();
      store.dispatch(logOut());
      store.dispatch(toggleLoginWindow());
      store.dispatch(setLoginError("Your session has expired."));
  }
  return Promise.reject(err);
});

export function loginUser(username, token, user_id) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('user_id', user_id);
    return {
      type: "POST_LOGIN",
      username,
      token,
      user_id
    }
}

export function setAuthFromStorage() {
    if (localStorage.getItem("token") && localStorage.getItem("username") && localStorage.getItem("user_id")) {
        return {
          type: "AUTH_SET_FROM_STORAGE",
          token: localStorage.getItem("token"),
          username: localStorage.getItem("username"),
          user_id: localStorage.getItem("user_id")
        }
    }
}

export function createPlaylist(title, description) {
    return function(dispatch) {
        return axios.post('/playlists', {
            title: title,
            description: description
        }).then((response) => {
            if (response.data.id) {
                dispatch(redirectToPlaylist(response.data.id));
                dispatch(toggleCreatePlaylistWindow())
            }
        });
    }
}

export function redirectToPlaylist(id) {
    browserHistory.push('/playlist/' + id);
}

export function sendLoginRequest(username, password) {
    return function(dispatch) {
        return axios.post('/authentication/login', {
            username: username,
            password: password
        }).then(function(response) {
            if(response.data.success){
                dispatch(loginUser(response.data.username, response.data.token, response.data.user_id));
            } else {
                dispatch(setLoginError(response.data.message));
            }
        });

    }
}

export function sendRegisterRequest(username, password) {
    return function(dispatch) {
        return axios.post('/authentication/register', {
            username: username,
            password: password
        }).then(function(response) {
            if (response.data.success) {
                dispatch(loginUser(response.data.username, response.data.token, response.data.user_id));
            } else {
                dispatch(setRegisterError(response.data.message));
            }
        });
    }
}

export function setRegisterError(message){
    return {
        type: "SET_REGISTER_ERROR",
        message: message
    }
}

export function setLoginError(message){
    return {
        type: "SET_LOGIN_ERROR",
        message: message
    }
}

export function fetchMessages() {
    return function(dispatch) {
        return axios.get('/chat').then(function(response) {
            if (response.data.messages) {
                dispatch(setMessages(response.data.messages));
            }
        });
    }
}

export function fetchPlaylist(playlist_id) {
    return function(dispatch) {
        return axios.get('/playlists/' + playlist_id, {}).then(function(response) {
            if (response.data) {
                dispatch(setIntialPlaylistData(response.data));
            }
        });
    }
}

export function searchYoutube(query) {
    return function(dispatch) {
        return axios.create({
          baseURL: "https://www.googleapis.com"
        }).get('/youtube/v3/search', {
            params: {
                q: query,
                key: "AIzaSyA0SUe7isd62Q2wNqHMAG91VFQEANrl7a0",
                part: "snippet",
                type: "video"
            }

        }).then(function(response) {
            if (response.data.items) {
                dispatch(setYoutubeResults(response.data.items));
            }
        });
    }
}

export function addVideo(id, title, playlist_id) {
    return function(dispatch){
    return axios.post('/videos/add', {
        title: title,
        youtube_id: id,
        playlist_id: playlist_id
    }).then(function(response) {
        dispatch(setResultsYoutube(null));
    });
  }
}

export function likeVideo(video_id, value) {
    return function(dispatch){
    return axios.post('/videos/like', {
        video_id: video_id,
        value: value,
    });
  }
}

export function setIntialPlaylistData(data) {
    return {
      type: "SET_INITIAL_PLAYLIST_DATA",
      playlist: data
    }
}

export function logOut() {
    return {
      type: "LOG_OUT"
    }
}

export function searchPlaylists(query) {
    return function(dispatch) {
        return axios.get('/playlists/search?q=' + query).then((response) => {
            if (response.data) {
                dispatch(setPlaylistResults(response.data));
            }
        });
    }
}

export function fetchPopularPlaylists() {
    return function(dispatch) {
        return axios.get('/playlists/').then((response) => {
            if (response.data) {
                dispatch(setPopularResults(response.data));
            }
        });
    }
}

export function setPlaylistResults(playlists) {
    return {
      type: "SET_PLAYLIST_RESULTS",
      results: playlists
    }
}

export function setPopularResults(playlists) {
    return {
      type: "SET_POPULAR_RESULTS",
      results: playlists
    }
}

export function setYoutubeResults(results) {
    return {
      type: "SET_YOUTUBE_RESULTS",
      results: results
    }
}

export function sendMessage(message, playlist_id) {
    return function(dispatch) {
        return axios.post('/chat/send', {
            message: message,
            playlist_id: playlist_id
        });
    }
}

export function toggleLoginWindow() {
    return {
      type: "TOGGLE_LOGIN_WINDOW"
    }
}

export function toggleRegisterWindow() {
    return {
      type: "TOGGLE_REGISTER_WINDOW"
    }
}

export function toggleLogoutWindow() {
    return {
      type: "TOGGLE_LOGOUT_WINDOW"
    }
}

export function toggleCreatePlaylistWindow() {
    return {
      type: "TOGGLE_CREATE_PLAYLIST_WINDOW"
    }
}
