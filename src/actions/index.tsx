import * as actionTypes from "../constants/actionTypes";
import {
  Action,
  AddVideoAction,
  ClearYoutubeResultsAction,
  CreatePlaylistAction,
  FetchPlaylistAction,
  GetActiveUsersAction,
  LikeVideoAction,
  SearchAction,
  SendHeartbeatAction,
  SendLoginRequestAction,
  SendMessageAction,
  SendRegisterRequestAction,
  SetAuthDataFromStorage,
  SetErrorMessageAction,
  UpdateSearchIndexAction,
  VideoAction,
  YoutubeVideoAction,
} from "../types";

export function createPlaylist(title: string, description: string): CreatePlaylistAction {
  return {
    type: actionTypes.CREATE_PLAYLIST,
    title,
    description,
  };
}

export function sendLoginRequest(username: string, password: string): SendLoginRequestAction {
  return {
    type: actionTypes.SEND_LOGIN_REQUEST,
    username,
    password,
  };
}

export function sendRegisterRequest(username: string, password: string): SendRegisterRequestAction {
  return {
    type: actionTypes.SEND_REGISTER_REQUEST,
    username,
    password,
  };
}

export function setRegisterError(message: string): SetErrorMessageAction {
  return {
    type: actionTypes.SET_REGISTER_ERROR,
    message,
  };
}

export function verifyToken(): Action {
  return {
    type: actionTypes.VERIFY_TOKEN,
  };
}

export function setAuthFromStorage(): SetAuthDataFromStorage {
  return {
    type: actionTypes.AUTH_SET_FROM_STORAGE,
    token: localStorage.getItem("token") || "",
    username: localStorage.getItem("username") || "",
    loggedIn: !!localStorage.getItem("token"),
    userId: parseInt(localStorage.getItem("userId") || "", 10) || 0,
  };
}

export function setLoginError(message: string): SetErrorMessageAction {
  return {
    type: actionTypes.SET_LOGIN_ERROR,
    message,
  };
}

export function fetchPlaylist(playlistId: string): FetchPlaylistAction {
  return {
    type: actionTypes.FETCH_PLAYLIST,
    playlistId,
  };
}

export function searchYoutube(query: string): SearchAction {
  return {
    type: actionTypes.SEARCH_YOUTUBE,
    query,
  };
}

export function addVideo(
  id: string,
  title: string,
  playlistId: string,
  autoAdded: boolean,
): AddVideoAction {
  return {
    type: actionTypes.ADD_VIDEO,
    title,
    youtubeId: id,
    playlistId,
    autoAdded,
  };
}

export function sendHeartbeat(username: string, playlist: string): SendHeartbeatAction {
  return {
    type: actionTypes.SEND_HEARTBEAT,
    playlist,
    username,
  };
}

export function getActiveUsers(playlist: string): GetActiveUsersAction {
  return {
    type: actionTypes.GET_ACTIVE_USERS,
    playlist,
  };
}

export function updateSearchIndex(value: number): UpdateSearchIndexAction {
  return {
    type: actionTypes.UPDATE_SEARCH_INDEX,
    value,
  };
}

export function clearYoutubeResults(): ClearYoutubeResultsAction {
  return {
    type: actionTypes.SET_YOUTUBE_RESULTS,
    results: [],
  };
}

export function resetYoutubeSearchQuery(): SearchAction {
  return {
    type: actionTypes.SET_YOUTUBE_SEARCH_QUERY,
    query: "",
  };
}

export function getRelatedVideos(videoId: string): YoutubeVideoAction {
  return {
    type: actionTypes.GET_RELATED_VIDEOS,
    videoId,
  };
}

export function likeVideo(videoId: number, value: number): LikeVideoAction {
  return {
    type: actionTypes.LIKE_VIDEO,
    videoId,
    value,
  };
}

export function logOut(): Action {
  localStorage.clear();
  return {
    type: actionTypes.LOG_OUT,
  };
}

export function deleteVideo(videoId: number): VideoAction {
  return {
    type: actionTypes.DELETE_VIDEO,
    videoId,
  };
}

export function finishVideo(videoId: number): VideoAction {
  return {
    type: actionTypes.FINISH_VIDEO,
    videoId,
  };
}

export function startVideo(videoId: number): VideoAction {
  return {
    type: actionTypes.START_VIDEO,
    videoId,
  };
}

export function searchPlaylists(query: string): SearchAction {
  return {
    type: actionTypes.SEARCH_PLAYLISTS,
    query,
  };
}

export function fetchPopularPlaylists(): Action {
  return {
    type: actionTypes.FETCH_POPULAR_PLAYLISTS,
  };
}

export function sendMessage(message: string, playlistId: string): SendMessageAction {
  return {
    type: actionTypes.SEND_MESSAGE,
    message,
    playlistId,
  };
}

export function toggleLoginWindow(): Action {
  return {
    type: actionTypes.TOGGLE_LOGIN_WINDOW,
  };
}

export function toggleRegisterWindow(): Action {
  return {
    type: actionTypes.TOGGLE_REGISTER_WINDOW,
  };
}

export function toggleLogoutWindow(): Action {
  return {
    type: actionTypes.TOGGLE_LOGOUT_WINDOW,
  };
}

export function toggleCreatePlaylistWindow(): Action {
  return {
    type: actionTypes.TOGGLE_CREATE_PLAYLIST_WINDOW,
  };
}

export function closeAllWindows(): Action {
  return {
    type: actionTypes.CLOSE_ALL_WINDOWS,
  };
}
