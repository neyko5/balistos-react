import axios from '../axios';
import { takeEvery } from 'redux-saga';
import {browserHistory} from 'react-router';
import { put } from 'redux-saga/effects'



export function* sendLoginRequest(action) {
    try {
        const response = yield axios.post('/authentication/login', {
            username: action.username,
            password: action.password
        });
        if(response.data.success) {
            yield put({ type: "POST_LOGIN", username: action.username, token: response.data.token, user_id: response.data.user_id});
        }
        else {
            yield put({type: "SET_LOGIN_ERROR", message: response.data.message});
        }
    } catch (error){
        yield put({type: "SET_LOGIN_ERROR", message: error.message});
    }
}

export function* sendRegisterRequest(action) {
    try {
        const response = yield axios.post('/authentication/register', {
            username: action.username,
            password: action.password
        });
        if(response.data.success) {
            yield put({ type: "POST_LOGIN", username: action.username, token: response.data.token, user_id: response.data.user_id});
        }
        else {
            yield put({type: "SET_REGISTER_ERROR", message: response.data.message});
        }
    } catch (error){
        yield put({type: "SET_REGISTER_ERROR", message: error.message});
    }
}

export function* verifyToken() {
    try {
        const response = yield axios.get('/authentication/verify');
    } catch (error){
        if (error.response && (error.response.status === 401 || error.response.status === 403 )) {
            yield put({type: "EXPIRE_SESSION"});
        }
    }
}

export function* fetchPopularPlaylists(action) {
    try {
        const response = yield axios.get('/playlists/');
        yield put({type: "SET_POPULAR_RESULTS", results: response.data});
    } catch(error){}
}

export function* searchPlaylists(action) {
    try {
        const response = yield axios.get('/playlists/search?q=' + action.query);
        yield put({type: "SET_PLAYLIST_RESULTS", results: response.data});
    } catch(error){}
}

export function* createPlaylist(action) {
    try{
        const response = yield axios.post('/playlists', {
            title: action.title,
            description: action.description
        });
        if (response.data.id) {
            yield put({type: "CLOSE_ALL_WINDOWS"});
            yield browserHistory.push('/playlist/' + response.data.id);
        }
    } catch(error){
        if (error.response && (error.response.status === 401 || error.response.status === 403 )) {
            yield put({type: "EXPIRE_SESSION"});
        }
    }
}

export function* fetchPlaylist(action) {
    try {
        const response = yield axios.get('/playlists/' + action.playlist_id, {});
        if(response.data) {
            yield put({type: "SET_INITIAL_PLAYLIST_DATA", playlist: response.data});
        }
    } catch(error){}
}

export function* sendMessage(action) {
    try{
        yield axios.post('/chat/send', {
            message: action.message,
            playlist_id: action.playlist_id
        });
    } catch(error){
        if (error.response && (error.response.status === 401 || error.response.status === 403 )) {
            yield put({type: "EXPIRE_SESSION"});
        }
    }
}

export function* likeVideo(action) {
    try {
        yield axios.post('/videos/like', {
            video_id: action.video_id,
            value: action.value,
        });
    } catch(error){
        if (error.response && (error.response.status === 401 || error.response.status === 403 )) {
            yield put({type: "EXPIRE_SESSION"});
        }
    }
}

export function* finishVideo(action) {
    try {
        yield axios.post('/videos/finish', {
            video_id: action.video_id
        });
        yield put({type: "SELECT_NEXT_VIDEO"});
    } catch(error){}
}

export function* startVideo(action) {
    try {
        yield axios.post('/videos/start', {
            video_id: action.video_id
        });
    } catch(error){}
}

export function* deleteVideo(action) {
    try {
        yield axios.post('/videos/delete', {
            video_id: action.video_id
        });
    } catch(error){
        if (error.response && (error.response.status === 401 || error.response.status === 403 )) {
            yield put({type: "EXPIRE_SESSION"});
        }
    }
}

export function* sendHeartbeat(action) {
    try {
        const response = yield axios.post('/playlists/heartbeat', {
            playlist_id: action.playlist,
            username: action.username,
        });
        if(response.data) {
            yield put({type: "SET_ACTIVE_USERS", users: response.data});
        }
    } catch(error){
        if (error.response && (error.response.status === 401 || error.response.status === 403 )) {
            yield put({type: "EXPIRE_SESSION"});
        }
    }
}

export function* getActiveUsers(action) {
    try {
        const response = yield axios.get('/playlists/users/' + action.playlist);
        if(response.data) {
            yield put({type: "SET_ACTIVE_USERS", users: response.data});
        }
    } catch(error){}
}

export function* addVideo(action) {
    try {
        yield axios.post('/videos/add', {
            title: action.title,
            youtube_id: action.youtube_id,
            playlist_id: action.playlist_id
        });
        yield put({type: "SET_YOUTUBE_RESULTS", results:[]});
        yield put({type: "SET_YOUTUBE_SEARCH_QUERY", query:''});
    } catch(error){
        if (error.response && (error.response.status === 401 || error.response.status === 403 )) {
            yield put({type: "EXPIRE_SESSION"});
        }
    }
}

export function* searchYoutube(action) {
    yield put({type: "SET_YOUTUBE_SEARCH_QUERY", query: action.query});
    try{
        const response = yield axios.create({
            baseURL: "https://www.googleapis.com"
        }).get('/youtube/v3/search', {
            params: {
                q: action.query,
                key: "AIzaSyA0SUe7isd62Q2wNqHMAG91VFQEANrl7a0",
                part: "snippet",
                type: "video",
                videoSyndicated: true,
                videoEmbeddable: true
            }
        });
        if (response.data.items){
            yield put({type: "SET_YOUTUBE_RESULTS", results: response.data.items});
        }
    } catch(error){}
}

export function* getRelatedVideos(action) {
    try{
        const response = yield axios.create({
            baseURL: "https://www.googleapis.com"
        }).get('/youtube/v3/search', {
            params: {
                relatedToVideoId: action.video_id,
                key: "AIzaSyA0SUe7isd62Q2wNqHMAG91VFQEANrl7a0",
                part: "snippet",
                type: "video",
                videoSyndicated: true,
                videoEmbeddable: true
            }
        });
        if (response.data.items){
            yield put({type: "SET_RELATED_RESULTS", results: response.data.items});
        }
    } catch(error){}
}

export function* expireSession(){
    localStorage.clear();
    yield put({type: "LOG_OUT"});
    yield put({type: "TOGGLE_LOGIN_WINDOW"});
    yield put({type: "SET_LOGIN_ERROR", message: "Your session has expired."});
}

export default function* rootSaga() {
    yield takeEvery('SEND_LOGIN_REQUEST', sendLoginRequest);
    yield takeEvery('SEND_REGISTER_REQUEST', sendRegisterRequest);
    yield takeEvery('FETCH_POPULAR_PLAYLISTS', fetchPopularPlaylists);
    yield takeEvery('SEARCH_PLAYLISTS', searchPlaylists);
    yield takeEvery('CREATE_PLAYLIST', createPlaylist);
    yield takeEvery('FETCH_PLAYLIST', fetchPlaylist);
    yield takeEvery('SEND_MESSAGE', sendMessage);
    yield takeEvery('LIKE_VIDEO', likeVideo);
    yield takeEvery('GET_ACTIVE_USERS', getActiveUsers);
    yield takeEvery('SEND_HEARTBEAT', sendHeartbeat);
    yield takeEvery('ADD_VIDEO', addVideo);
    yield takeEvery('SEARCH_YOUTUBE', searchYoutube);
    yield takeEvery('EXPIRE_SESSION', expireSession);
    yield takeEvery('FINISH_VIDEO', finishVideo);
    yield takeEvery('DELETE_VIDEO', deleteVideo);
    yield takeEvery('VERIFY_TOKEN', verifyToken);
    yield takeEvery('START_VIDEO', startVideo);
    yield takeEvery('GET_RELATED_VIDEOS', getRelatedVideos);
}
