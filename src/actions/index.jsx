// @flow

import * as actionTypes from '../constants/actionTypes';
import type { Action } from '../types';

export function createPlaylist(title: string, description: string, history: any): Action {
  return {
    type: actionTypes.CREATE_PLAYLIST,
    title,
    description,
    history,
  };
}

export function sendLoginRequest(username: string, password: string): Action {
  return {
    type: actionTypes.SEND_LOGIN_REQUEST,
    username,
    password,
  };
}

export function sendRegisterRequest(username: string, password: string): Action {
  return {
    type: actionTypes.SEND_REGISTER_REQUEST,
    username,
    password,
  };
}

export function setRegisterError(message: string): Action {
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

export function setLoginError(message: string): Action {
  return {
    type: actionTypes.SET_LOGIN_ERROR,
    message,
  };
}

export function fetchPlaylist(playlistId: string): Action {
  return {
    type: actionTypes.FETCH_PLAYLIST,
    playlistId,
  };
}

export function searchYoutube(query: string): Action {
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
): Action {
  return {
    type: actionTypes.ADD_VIDEO,
    title,
    youtubeId: id,
    playlistId,
    autoAdded,
  };
}

export function sendHeartbeat(username: string, playlist: string): Action {
  return {
    type: actionTypes.SEND_HEARTBEAT,
    playlist,
    username,
  };
}

export function getActiveUsers(playlist: string): Action {
  return {
    type: actionTypes.GET_ACTIVE_USERS,
    playlist,
  };
}

export function updateSearchIndex(value: number): Action {
  return {
    type: actionTypes.UPDATE_SEARCH_INDEX,
    value,
  };
}

export function clearYoutubeResults(): Action {
  return {
    type: actionTypes.SET_YOUTUBE_RESULTS,
    results: [],
  };
}

export function resetYoutubeSearchQuery(): Action {
  return {
    type: actionTypes.SET_YOUTUBE_SEARCH_QUERY,
    query: '',
  };
}

export function getRelatedVideos(videoId: string): Action {
  return {
    type: actionTypes.GET_RELATED_VIDEOS,
    videoId,
  };
}

export function likeVideo(videoId: string, value: number): Action {
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

export function deleteVideo(videoId: string): Action {
  return {
    type: actionTypes.DELETE_VIDEO,
    videoId,
  };
}

export function finishVideo(videoId: string): Action {
  return {
    type: actionTypes.FINISH_VIDEO,
    videoId,
  };
}

export function startVideo(videoId: string): Action {
  return {
    type: actionTypes.START_VIDEO,
    videoId,
  };
}


export function searchPlaylists(query: string): Action {
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

export function sendMessage(message: string, playlistId: string): Action {
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
