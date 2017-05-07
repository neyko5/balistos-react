import * as actionTypes from '../constants/actionTypes';
export function createPlaylist(title, description, history) {
  return {
    type: actionTypes.CREATE_PLAYLIST,
    title,
    description,
    history
  };
}

export function sendLoginRequest(username, password) {
  return {
    type: actionTypes.SEND_LOGIN_REQUEST,
    username,
    password,
  };
}

export function sendRegisterRequest(username, password) {
  return {
    type: actionTypes.SEND_REGISTER_REQUEST,
    username,
    password,
  };
}

export function setRegisterError(message) {
  return {
    type: actionTypes.SET_REGISTER_ERROR,
    message,
  };
}

export function verifyToken() {
  return {
    type: actionTypes.VERIFY_TOKEN,
  };
}

export function setLoginError(message) {
  return {
    type: actionTypes.SET_LOGIN_ERROR,
    message,
  };
}

export function fetchPlaylist(playlistId) {
  return {
    type: actionTypes.FETCH_PLAYLIST,
    playlistId: playlistId,
  };
}

export function searchYoutube(query) {
  return {
    type: actionTypes.SEARCH_YOUTUBE,
    query,
  };
}

export function addVideo(id, title, playlistId) {
  return {
    type: actionTypes.ADD_VIDEO,
    title,
    youtubeId: id,
    playlistId: playlistId,
  };
}

export function sendHeartbeat(username, playlist) {
  return {
    type: actionTypes.SEND_HEARTBEAT,
    playlist,
    username,
  };
}

export function getActiveUsers(playlist) {
  return {
    type: actionTypes.GET_ACTIVE_USERS,
    playlist,
  };
}

export function updateSearchIndex(value) {
  return {
    type: actionTypes.UPDATE_SEARCH_INDEX,
    value,
  };
}

export function clearYoutubeResults() {
  return {
    type: actionTypes.SET_YOUTUBE_RESULTS,
    results: [],
  };
}

export function resetYoutubeSearchQuery() {
  return {
    type: actionTypes.SET_YOUTUBE_SEARCH_QUERY,
    query: '',
  };
}

export function getRelatedVideos(videoId) {
  return {
    type: actionTypes.GET_RELATED_VIDEOS,
    videoId: videoId,
  };
}

export function likeVideo(videoId, value) {
  return {
    type: actionTypes.LIKE_VIDEO,
    videoId: videoId,
    value,
  };
}

export function logOut() {
  localStorage.clear();
  return {
    type: actionTypes.LOG_OUT,
  };
}

export function deleteVideo(videoId) {
  return {
    type: actionTypes.DELETE_VIDEO,
    videoId: videoId,
  };
}

export function finishVideo(videoId) {
  return {
    type: actionTypes.FINISH_VIDEO,
    videoId: videoId,
  };
}

export function startVideo(videoId) {
  return {
    type: actionTypes.START_VIDEO,
    videoId: videoId,
  };
}


export function searchPlaylists(query) {
  return {
    type: actionTypes.SEARCH_PLAYLISTS,
    query,
  };
}

export function fetchPopularPlaylists() {
  return {
    type: actionTypes.FETCH_POPULAR_PLAYLISTS,
  };
}

export function sendMessage(message, playlistId) {
  return {
    type: actionTypes.SEND_MESSAGE,
    message,
    playlistId: playlistId,
  };
}

export function toggleLoginWindow() {
  return {
    type: actionTypes.TOGGLE_LOGIN_WINDOW,
  };
}

export function toggleRegisterWindow() {
  return {
    type: actionTypes.TOGGLE_REGISTER_WINDOW,
  };
}

export function toggleLogoutWindow() {
  return {
    type: actionTypes.TOGGLE_LOGOUT_WINDOW,
  };
}

export function toggleCreatePlaylistWindow() {
  return {
    type: actionTypes.TOGGLE_CREATE_PLAYLIST_WINDOW,
  };
}

export function closeAllWindows() {
  return {
    type: actionTypes.CLOSE_ALL_WINDOWS,
  };
}
