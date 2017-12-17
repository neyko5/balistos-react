import { put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';

import axios from '../axios';

export function* sendLoginRequest(action) {
  try {
    const response = yield axios.post('/graphql', {
      query: `{
        login(username: "${action.username}", password: "${action.password}") {
          success,
          username,
          userId,
          token
        }
      }`,
    });
    if (response.data.data.login && response.data.data.login.success) {
      yield put({
        type: actionTypes.POST_LOGIN,
        username: action.username,
        token: response.data.data.login.token,
        userId: response.data.data.login.userId,
      });
    } else {
      yield put({ type: actionTypes.SET_LOGIN_ERROR, message: response.data.data.login.message });
    }
  } catch (error) {
    yield put({ type: actionTypes.SET_LOGIN_ERROR, message: error.message });
  }
}

export function* sendRegisterRequest(action) {
  try {
    const response = yield axios.post('/graphql', {
      query: `
        mutation {
          register(username: "${action.username}", password: "${action.password}") {
            success,
            username,
            userId,
            token
          }
        }`,
    });
    if (response.data.data.register && response.data.data.register.success) {
      yield put({
        type: actionTypes.POST_LOGIN,
        username: action.username,
        token: response.data.data.register.token,
        userId: response.data.data.register.userId,
      });
    } else {
      yield put({
        type: actionTypes.SET_REGISTER_ERROR,
        message: response.data.data.register.message,
      });
    }
  } catch (error) {
    yield put({ type: actionTypes.SET_REGISTER_ERROR, message: error.message });
  }
}

export function* verifyToken() {
  try {
    const response = yield axios.post('/graphql', {
      query:
        `{
            verifyToken {
              success
            }
        }`,
    });
    if (!response.data.data.verifyToken.success) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* fetchPopularPlaylists() {
  try {
    const response = yield axios.post('/graphql', {
      query: `{
        getPlaylists {
          id,
          title,
          description,
          count,
          username
        }
      }`,
    });
    if (response.data.data.getPlaylists) {
      yield put({
        type: actionTypes.SET_POPULAR_RESULTS,
        results: response.data.data.getPlaylists,
      });
    }
  } catch (error) {}
}

export function* searchPlaylists(action) {
  try {
    const response = yield axios.post('/graphql', {
      query: `{
        searchPlaylist(query: "${action.query}") {
          id,
          title,
          description,
          user {
            username
          }
        }
      }`,
    });
    if (response.data.data.searchPlaylist) {
      yield put({
        type: actionTypes.SET_PLAYLIST_RESULTS,
        results: response.data.data.searchPlaylist,
      });
    }
  } catch (error) {}
}

export function* createPlaylist(action) {
  try {
    const response = yield axios.post('/graphql', {
      query: `
        mutation{
          createPlaylist(title: "${action.title}", description: "${action.description}") {
            success,
            id
          }
        }`,
    });
    if (response.data.id) {
      yield put({ type: actionTypes.CLOSE_ALL_WINDOWS });
      window.location.hash = `/playlist/${response.data.id}`;
    }
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* fetchPlaylist(action) {
  try {
    const response = yield axios.post('/graphql', {
      query: `{
        getPlaylist(id: ${action.playlistId}) {
          id,
          title,
          description,
          user {
            username
          }
          playlistVideos {
            id,
            active,
            likes {
              value,
              id,
              user {
                username
              }
            },
            user {
              username
            },
            video {
              id,
              title,
              youtubeId
            }
          }
          chats {
            message,
            createdAt,
            id,
            user {
              username
            }
          }
        }
      }`,
    });
    if (response.data && response.data.data && response.data.data.getPlaylist) {
      const playlistData = response.data.data.getPlaylist;
      document.title = `Balistos - ${playlistData.title}`;
      yield put({ type: actionTypes.SET_INITIAL_PLAYLIST_DATA, playlist: playlistData });
    }
  } catch (error) {
    yield put({ type: actionTypes.DISPLAY_SERVER_ERROR });
  }
}

export function* sendMessage(action) {
  try {
    yield axios.post('/graphql', {
      query:
      `mutation{
          createChat(message: "${action.message}", playlistId: "${action.playlistId}") {
             success
          }
      }`,
    });
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* likeVideo(action) {
  try {
    yield axios.post('/graphql', {
      query:
        `mutation{
            likeVideo(videoId: "${action.videoId}", value: ${action.value}) {
              success
            }
        }`,
    });
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* finishVideo(action) {
  try {
    yield axios.post('/graphql', {
      query:
        `mutation{
            finishVideo(videoId: "${action.videoId}") {
              success
            }
        }`,
    });
    yield put({ type: actionTypes.SELECT_NEXT_VIDEO });
  } catch (error) {
    yield put({ type: actionTypes.DISPLAY_SERVER_ERROR });
  }
}

export function* startVideo(action) {
  try {
    yield axios.post('/graphql', {
      query:
        `mutation{
            startVideo(videoId: "${action.videoId}") {
              success
            }
        }`,
    });
  } catch (error) {
    yield put({ type: actionTypes.DISPLAY_SERVER_ERROR });
  }
}

export function* deleteVideo(action) {
  try {
    yield axios.post('/graphql', {
      query:
        `mutation{
            deleteVideo(videoId: "${action.videoId}") {
              success
            }
        }`,
    });
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* sendHeartbeat(action) {
  try {
    const response = yield axios.post('/graphql', {
      query:
        `mutation{
            heartbeat(playlistId: "${action.playlist}", username: "${action.username}") {
              username
            }
        }`,
    });
    if (response.data.data.heartbeat) {
      yield put({ type: actionTypes.SET_ACTIVE_USERS, users: response.data.data.heartbeat });
    }
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* getActiveUsers(action) {
  try {
    const response = yield axios.post('/graphql', {
      query:
        `{
            getPlaylistUsers(playlistId: "${action.playlist}") {
              username
            }
        }`,
    });
    if (response.data.data) {
      yield put({ type: actionTypes.SET_ACTIVE_USERS, users: response.data.data });
    }
  } catch (error) {
    yield put({ type: actionTypes.DISPLAY_SERVER_ERROR });
  }
}

export function* addVideo(action) {
  try {
    yield axios.post('/graphql', {
      query:
        `mutation{
            addVideo(title: "${action.title}", playlistId: "${action.playlistId}", autoAdded: ${!!action.autoAdded}, youtubeId: "${action.youtubeId}") {
              success
        }
      }`,
    });
    yield put({ type: actionTypes.SET_YOUTUBE_RESULTS, results: [] });
    yield put({ type: actionTypes.SET_YOUTUBE_SEARCH_QUERY, query: '' });
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      yield put({ type: actionTypes.EXPIRE_SESSION });
    }
  }
}

export function* searchYoutube(action) {
  yield put({ type: actionTypes.SET_YOUTUBE_SEARCH_QUERY, query: action.query });
  try {
    const response = yield axios.create({
      baseURL: 'https://www.googleapis.com',
    }).get('/youtube/v3/search', {
      params: {
        q: action.query,
        key: 'AIzaSyA0SUe7isd62Q2wNqHMAG91VFQEANrl7a0',
        part: 'snippet',
        type: 'video',
        videoSyndicated: true,
        videoEmbeddable: true,
      },
    });
    if (response.data.items) {
      yield put({ type: actionTypes.SET_YOUTUBE_RESULTS, results: response.data.items });
    }
  } catch (error) {
    yield put({ type: actionTypes.DISPLAY_SERVER_ERROR });
  }
}

export function* getRelatedVideos(action) {
  try {
    const response = yield axios.create({
      baseURL: 'https://www.googleapis.com',
    }).get('/youtube/v3/search', {
      params: {
        relatedToVideoId: action.videoId,
        key: 'AIzaSyA0SUe7isd62Q2wNqHMAG91VFQEANrl7a0',
        part: 'snippet',
        type: 'video',
        maxResults: 10,
        videoSyndicated: true,
        videoEmbeddable: true,
      },
    });
    if (response.data.items) {
      yield put({ type: actionTypes.SET_RELATED_RESULTS, results: response.data.items });
    }
  } catch (error) {
    yield put({ type: actionTypes.DISPLAY_SERVER_ERROR });
  }
}

export function* expireSession() {
  localStorage.clear();
  yield put({ type: actionTypes.LOG_OUT });
  yield put({ type: actionTypes.TOGGLE_LOGIN_WINDOW });
  yield put({ type: actionTypes.SET_LOGIN_ERROR, message: 'Your session has expired.' });
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.SEND_LOGIN_REQUEST, sendLoginRequest);
  yield takeEvery(actionTypes.SEND_REGISTER_REQUEST, sendRegisterRequest);
  yield takeEvery(actionTypes.FETCH_POPULAR_PLAYLISTS, fetchPopularPlaylists);
  yield takeEvery(actionTypes.SEARCH_PLAYLISTS, searchPlaylists);
  yield takeEvery(actionTypes.CREATE_PLAYLIST, createPlaylist);
  yield takeEvery(actionTypes.FETCH_PLAYLIST, fetchPlaylist);
  yield takeEvery(actionTypes.SEND_MESSAGE, sendMessage);
  yield takeEvery(actionTypes.LIKE_VIDEO, likeVideo);
  yield takeEvery(actionTypes.GET_ACTIVE_USERS, getActiveUsers);
  yield takeEvery(actionTypes.SEND_HEARTBEAT, sendHeartbeat);
  yield takeEvery(actionTypes.ADD_VIDEO, addVideo);
  yield takeEvery(actionTypes.SEARCH_YOUTUBE, searchYoutube);
  yield takeEvery(actionTypes.EXPIRE_SESSION, expireSession);
  yield takeEvery(actionTypes.FINISH_VIDEO, finishVideo);
  yield takeEvery(actionTypes.DELETE_VIDEO, deleteVideo);
  yield takeEvery(actionTypes.VERIFY_TOKEN, verifyToken);
  yield takeEvery(actionTypes.START_VIDEO, startVideo);
  yield takeEvery(actionTypes.GET_RELATED_VIDEOS, getRelatedVideos);
}
