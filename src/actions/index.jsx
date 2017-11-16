// @flow
import * as actionTypes from '../constants/actionTypes';

export function createPlaylist(title: string, description: string, history: any) {
  return {
    type: actionTypes.CREATE_PLAYLIST,
    title,
    description,
    history,
  };
}

export function sendLoginRequest(username: string, password: string) {
  return {
    type: actionTypes.SEND_LOGIN_REQUEST,
    username,
    password,
  };
}

export function sendRegisterRequest(username: string, password: string) {
  return {
    type: actionTypes.SEND_REGISTER_REQUEST,
    username,
    password,
  };
}

export function setRegisterError(message: string) {
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

export function setLoginError(message: string) {
  return {
    type: actionTypes.SET_LOGIN_ERROR,
    message,
  };
}

export function fetchPlaylist(playlistId: string) {
  return {
    type: actionTypes.FETCH_PLAYLIST,
    playlistId,
  };
}

export function searchYoutube(query: string) {
  return {
    type: actionTypes.SEARCH_YOUTUBE,
    query,
  };
}

export function addVideo(id: string, title: string, playlistId: string, autoAdded: boolean) {
  return {
    type: actionTypes.ADD_VIDEO,
    title,
    youtubeId: id,
    playlistId,
    autoAdded,
  };
}

export function sendHeartbeat(username: string, playlist: string) {
  return {
    type: actionTypes.SEND_HEARTBEAT,
    playlist,
    username,
  };
}

export function getActiveUsers(playlist: string) {
  return {
    type: actionTypes.GET_ACTIVE_USERS,
    playlist,
  };
}

export function updateSearchIndex(value: number) {
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

export function getRelatedVideos(videoId: string) {
  return {
    type: actionTypes.GET_RELATED_VIDEOS,
    videoId,
  };
}

export function likeVideo(videoId: string, value: number) {
  return {
    type: actionTypes.LIKE_VIDEO,
    videoId,
    value,
  };
}

export function logOut() {
  localStorage.clear();
  return {
    type: actionTypes.LOG_OUT,
  };
}

export function deleteVideo(videoId: string) {
  return {
    type: actionTypes.DELETE_VIDEO,
    videoId,
  };
}

export function finishVideo(videoId: string) {
  return {
    type: actionTypes.FINISH_VIDEO,
    videoId,
  };
}

export function startVideo(videoId: string) {
  return {
    type: actionTypes.START_VIDEO,
    videoId,
  };
}


export function searchPlaylists(query: string) {
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

export function sendMessage(message: string, playlistId: string) {
  return {
    type: actionTypes.SEND_MESSAGE,
    message,
    playlistId,
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
