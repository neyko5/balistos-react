import axios from 'axios';
import {browserHistory} from 'react-router'

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
    if (localStorage.getItem("token") && localStorage.getItem("username")) {
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
        return axios.post('http://localhost:3000/playlists', {
            title: title,
            description: description
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            if (response.data.id) {
                dispatch(redirectToPlaylist(response.data.id));
            }
        });
    }
}

export function redirectToPlaylist(id) {
    browserHistory.push('/playlist/' + id);
}

export function sendLoginRequest(username, password) {
    return function(dispatch) {
        return axios.post('http://localhost:3000/authentication/login', {
            username: username,
            password: password
        }).then(function(response) {
            dispatch(loginUser(response.data.username, response.data.token, response.data.user_id));
        });

    }
}

export function sendRegisterRequest(username, email, password) {
    return function(dispatch) {
        return axios.post('http://localhost:3000/authentication/register', {
            username: username,
            email: email,
            password: password
        }).then(function(response) {
            if (response.data) {
                dispatch(loginUser(response.data.username, response.data.token, response.data.user_id));
            }
        });
    }
}

export function fetchMessages() {
    return function(dispatch) {
        return axios.get('http://localhost:3000/chat').then(function(response) {
            if (response.data.messages) {
                dispatch(setMessages(response.data.messages));
            }
        });
    }
}

export function fetchPlaylist(playlist_id) {
    return function(dispatch) {
        return axios.get('http://localhost:3000/playlists/' + playlist_id, {}).then(function(response) {
            if (response.data) {
                dispatch(setIntialPlaylistData(response.data));
            }
        });
    }
}

export function searchYoutube(query) {
    return function(dispatch) {
        return axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                q: query,
                key: "AIzaSyA0SUe7isd62Q2wNqHMAG91VFQEANrl7a0",
                part: "snippet",
                type: "video"
            }

        }).then(function(response) {
            if (response.data.items) {
                dispatch(setResultsYoutube(response.data.items));
            }
        });
    }
}

export function setResultsYoutube(results) {
    return {
      type: "SET_RESULTS",
      results: results
    }
}

export function addVideo(id, title, playlist_id) {
    return function(dispatch){
    return axios.post('http://localhost:3000/videos/add', {
        title: title,
        youtube_id: id,
        playlist_id: playlist_id
    },
    {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }).then(function(response) {
        dispatch(setResultsYoutube(null));
    });
  }
}

export function likeVideo(video_id, value) {
    return function(dispatch){
    return axios.post('http://localhost:3000/videos/like', {
        video_id: video_id,
        value: value,
    },
    {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });
  }
}

export function setIntialPlaylistData(data) {
    return {
      type: "SET_INITIAL_PLAYLIST_DATA",
      playlist: data
    }
}

export function receiveRawMessage(msg) {
    return {
      type: "RECIEVE_MESSAGE",
      message: msg
    }
}

export function logOut() {
    return {
      type: "LOG_OUT"
    }
}

export function searchPlaylists(query) {
    return function(dispatch) {
        return axios.get('http://localhost:3000/playlists',{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
      }).then((response) => {
            if (response.data) {
                dispatch(setPlaylistResults(response.data));
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

export function sendMessage(message, playlist_id) {
    return function(dispatch) {
        return axios.post('http://localhost:3000/chat/send', {
            message: message,
            playlist_id: playlist_id
        },
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
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
