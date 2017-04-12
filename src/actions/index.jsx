export function createPlaylist(title, description) {
  return {
    type: 'CREATE_PLAYLIST',
    title,
    description,
  };
}

export function sendLoginRequest(username, password) {
  return {
    type: 'SEND_LOGIN_REQUEST',
    username,
    password,
  };
}

export function sendRegisterRequest(username, password) {
  return {
    type: 'SEND_REGISTER_REQUEST',
    username,
    password,
  };
}

export function setRegisterError(message) {
  return {
    type: 'SET_REGISTER_ERROR',
    message,
  };
}

export function verifyToken() {
  return {
    type: 'VERIFY_TOKEN',
  };
}

export function setLoginError(message) {
  return {
    type: 'SET_LOGIN_ERROR',
    message,
  };
}

export function fetchPlaylist(playlistId) {
  return {
    type: 'FETCH_PLAYLIST',
    playlist_id: playlistId,
  };
}

export function searchYoutube(query) {
  return {
    type: 'SEARCH_YOUTUBE',
    query,
  };
}

export function addVideo(id, title, playlistId) {
  return {
    type: 'ADD_VIDEO',
    title,
    youtube_id: id,
    playlist_id: playlistId,
  };
}

export function sendHeartbeat(username, playlist) {
  return {
    type: 'SEND_HEARTBEAT',
    playlist,
    username,
  };
}

export function getActiveUsers(playlist) {
  return {
    type: 'GET_ACTIVE_USERS',
    playlist,
  };
}

export function updateSearchIndex(value) {
  return {
    type: 'UPDATE_SEARCH_INDEX',
    value,
  };
}

export function clearYoutubeResults() {
  return {
    type: 'SET_YOUTUBE_RESULTS',
    results: [],
  };
}

export function resetYoutubeSearchQuery() {
  return {
    type: 'SET_YOUTUBE_SEARCH_QUERY',
    query: '',
  };
}

export function getRelatedVideos(videoId) {
  return {
    type: 'GET_RELATED_VIDEOS',
    video_id: videoId,
  };
}

export function likeVideo(videoId, value) {
  return {
    type: 'LIKE_VIDEO',
    video_id: videoId,
    value,
  };
}

export function logOut() {
  localStorage.clear();
  return {
    type: 'LOG_OUT',
  };
}

export function deleteVideo(videoId) {
  return {
    type: 'DELETE_VIDEO',
    video_id: videoId,
  };
}

export function finishVideo(videoId) {
  return {
    type: 'FINISH_VIDEO',
    video_id: videoId,
  };
}

export function startVideo(videoId) {
  return {
    type: 'START_VIDEO',
    video_id: videoId,
  };
}


export function searchPlaylists(query) {
  return {
    type: 'SEARCH_PLAYLISTS',
    query,
  };
}

export function fetchPopularPlaylists() {
  return {
    type: 'FETCH_POPULAR_PLAYLISTS',
  };
}

export function sendMessage(message, playlistId) {
  return {
    type: 'SEND_MESSAGE',
    message,
    playlist_id: playlistId,
  };
}

export function toggleLoginWindow() {
  return {
    type: 'TOGGLE_LOGIN_WINDOW',
  };
}

export function toggleRegisterWindow() {
  return {
    type: 'TOGGLE_REGISTER_WINDOW',
  };
}

export function toggleLogoutWindow() {
  return {
    type: 'TOGGLE_LOGOUT_WINDOW',
  };
}

export function toggleCreatePlaylistWindow() {
  return {
    type: 'TOGGLE_CREATE_PLAYLIST_WINDOW',
  };
}
