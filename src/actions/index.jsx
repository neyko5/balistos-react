export function createPlaylist(title, description) {
    return {
        type: "CREATE_PLAYLIST",
        title: title,
        description: description
    }
}

export function sendLoginRequest(username, password) {
    return {
        type: "SEND_LOGIN_REQUEST",
        username: username,
        password: password
    }
}

export function sendRegisterRequest(username, password) {
    return {
        type: "SEND_REGISTER_REQUEST",
        username: username,
        password: password,
    }
}

export function setRegisterError(message){
    return {
        type: "SET_REGISTER_ERROR",
        message: message
    }
}

export function verifyToken(){
    return {
        type: "VERIFY_TOKEN"
    }
}

export function setLoginError(message){
    return {
        type: "SET_LOGIN_ERROR",
        message: message
    }
}

export function fetchPlaylist(playlist_id) {
    return {
        type: "FETCH_PLAYLIST",
        playlist_id: playlist_id
    }
}

export function searchYoutube(query) {
    return {
        type: "SEARCH_YOUTUBE",
        query: query
    }
}

export function addVideo(id, title, playlist_id) {
    return {
        type: "ADD_VIDEO",
        title: title,
        youtube_id: id,
        playlist_id: playlist_id
    }
}

export function sendHeartbeat(username, playlist) {
    return {
        type: "SEND_HEARTBEAT",
        playlist: playlist,
        username: username
    }
}

export function getActiveUsers(playlist) {
    return {
        type: "GET_ACTIVE_USERS",
        playlist: playlist
    }
}

export function updateSearchIndex(value) {
    return {
        type: "UPDATE_SEARCH_INDEX",
        value: value
    }
}

export function clearYoutubeResults() {
    return {
        type: "SET_YOUTUBE_RESULTS",
        results: []
    }
}

export function resetYoutubeSearchQuery() {
    return {
        type: "SET_YOUTUBE_SEARCH_QUERY",
        query: ""
    }
}

export function getRelatedVideos(video_id) {
    return {
        type: "GET_RELATED_VIDEOS",
        video_id
    }
}

export function likeVideo(video_id, value) {
    return {
        type: "LIKE_VIDEO",
        video_id: video_id,
        value: value
    }
}

export function logOut() {
    localStorage.clear();
    return {
      type: "LOG_OUT"
    }
}

export function deleteVideo(video_id) {
    return {
        type: "DELETE_VIDEO",
        video_id: video_id
    }
}

export function finishVideo(video_id) {
    return {
        type: "FINISH_VIDEO",
        video_id: video_id
    }
}

export function startVideo(video_id) {
    return {
        type: "START_VIDEO",
        video_id: video_id
    }
}


export function searchPlaylists(query) {
    return {
        type: "SEARCH_PLAYLISTS",
        query: query
    }
}

export function fetchPopularPlaylists() {
    return {
        type: "FETCH_POPULAR_PLAYLISTS"
    }
}

export function sendMessage(message, playlist_id) {
    return {
        type: "SEND_MESSAGE",
        message: message,
        playlist_id: playlist_id
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
