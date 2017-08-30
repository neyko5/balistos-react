import * as actions from '../index'; 
import * as types from '../../constants/actionTypes'; 
 
describe('actions', () => { 
  it('should create an action to create playlist', () => { 
    const title = 'Playlist title'; 
    const description = 'Playlist description'; 
    const history = new Object(); 
    const expectedAction = { 
      type: types.CREATE_PLAYLIST, 
      title, 
      description, 
      history 
    } 
    expect(actions.createPlaylist(title, description, history)).toEqual(expectedAction); 
  }); 
 
  it('should create an action for login request', () => { 
    const username = 'user123'; 
    const password = 'supersecretpass'; 
    const expectedAction = { 
      type: types.SEND_LOGIN_REQUEST, 
      username, 
      password 
    } 
    expect(actions.sendLoginRequest(username, password)).toEqual(expectedAction); 
  }); 
 
  it('should create an action for register request', () => { 
    const username = 'user123'; 
    const password = 'supersecretpass'; 
    const expectedAction = { 
      type: types.SEND_REGISTER_REQUEST, 
      username, 
      password 
    } 
    expect(actions.sendRegisterRequest(username, password)).toEqual(expectedAction); 
  }); 
 
  it('should create an action for setting registration error', () => { 
    const message = 'Username was too short.'; 
    const expectedAction = { 
      type: types.SET_REGISTER_ERROR, 
      message 
    } 
    expect(actions.setRegisterError(message)).toEqual(expectedAction); 
  }); 
 
  it('should create an action for setting login error', () => { 
    const message = 'Username was too short.'; 
    const expectedAction = { 
      type: types.SET_LOGIN_ERROR, 
      message 
    } 
    expect(actions.setLoginError(message)).toEqual(expectedAction); 
  }); 
 
  it('should create an action for verifying access token', () => { 
    const expectedAction = { 
      type: types.VERIFY_TOKEN 
    } 
    expect(actions.verifyToken()).toEqual(expectedAction); 
  }); 
 
  it('should create an action for fetching playlist data', () => { 
    const playlistId = 1; 
    const expectedAction = { 
      type: types.FETCH_PLAYLIST, 
      playlistId 
    } 
    expect(actions.fetchPlaylist(playlistId)).toEqual(expectedAction); 
  }); 
 
  it('should create an action for searching videos on YouTube', () => { 
    const query = 'metallica'; 
    const expectedAction = { 
      type: types.SEARCH_YOUTUBE, 
      query 
    } 
    expect(actions.searchYoutube(query)).toEqual(expectedAction); 
  }); 
 
  it('should create an action to add a video', () => { 
    const youtubeId = 'khfqC9i30Q4'; 
    const title = 'Best rock songs'; 
    const playlistId = 1; 
    const expectedAction = { 
      type: types.ADD_VIDEO, 
      youtubeId, 
      title, 
      playlistId 
    } 
    expect(actions.addVideo(youtubeId, title, playlistId)).toEqual(expectedAction); 
  }); 
 
  it('should create an action to send a heartbeat', () => { 
    const playlistId = 1; 
    const username = 'user123'; 
    const expectedAction = { 
      type: types.SEND_HEARTBEAT, 
      username, 
      playlistId 
    } 
    expect(actions.sendHeartbeat(username, playlistId)).toEqual(expectedAction); 
  }); 
 
  it('should create an action to get active users for playlist', () => { 
    const playlistId = 1; 
    const expectedAction = { 
      type: types.GET_ACTIVE_USERS, 
      playlistId 
    } 
    expect(actions.getActiveUsers(playlistId)).toEqual(expectedAction); 
  }); 
 
  it('should create an action to update video search index', () => { 
    const value = 1; 
    const expectedAction = { 
      type: types.UPDATE_SEARCH_INDEX, 
      value 
    } 
    expect(actions.updateSearchIndex(value)).toEqual(expectedAction); 
  }); 
 
  it('should create an action to clear YouTube video results', () => { 
    const expectedAction = { 
      type: types.SET_YOUTUBE_RESULTS, 
      results: [] 
    } 
    expect(actions.clearYoutubeResults()).toEqual(expectedAction); 
  }); 
 
  it('should create an action for reseting query for YouTube search', () => { 
    const expectedAction = { 
      type: types.SET_YOUTUBE_SEARCH_QUERY, 
      query: '' 
    } 
    expect(actions.resetYoutubeSearchQuery()).toEqual(expectedAction); 
  }); 
 
  it('should create an action for getting related videos on YouTube', () => { 
    const videoId = 2;  
    const expectedAction = { 
      type: types.GET_RELATED_VIDEOS, 
      videoId 
    } 
    expect(actions.getRelatedVideos(videoId)).toEqual(expectedAction); 
  }); 
 
  it('should create an action for liking a video', () => { 
    const videoId = 2; 
    const value = 1; 
    const expectedAction = { 
      type: types.LIKE_VIDEO, 
      videoId, 
      value 
    } 
    expect(actions.likeVideo(videoId, value)).toEqual(expectedAction); 
  }); 
 
  it('should create an action for logging out', () => { 
    const expectedAction = { 
      type: types.LOG_OUT 
    } 
    expect(actions.logOut()).toEqual(expectedAction); 
  }); 
 
  it('should create an action for deleting a video', () => { 
    const videoId = 2; 
    const expectedAction = { 
      type: types.DELETE_VIDEO, 
      videoId 
    } 
    expect(actions.deleteVideo(videoId)).toEqual(expectedAction); 
  }); 
 
  it('should create an action for finishing a video', () => { 
    const videoId = 2; 
    const expectedAction = { 
      type: types.FINISH_VIDEO, 
      videoId 
    } 
    expect(actions.finishVideo(videoId)).toEqual(expectedAction); 
  }); 
 
  it('should create an action for starting a video', () => { 
    const videoId = 2; 
    const expectedAction = { 
      type: types.START_VIDEO, 
      videoId 
    } 
    expect(actions.startVideo(videoId)).toEqual(expectedAction); 
  }); 
 
  it('should create an action for searching playlists', () => { 
    const query = 'rock'; 
    const expectedAction = { 
      type: types.SEARCH_PLAYLISTS, 
      query 
    } 
    expect(actions.searchPlaylists(query)).toEqual(expectedAction); 
  }); 
 
  it('should create an action for fetching popular playlists', () => { 
    const expectedAction = { 
      type: types.FETCH_POPULAR_PLAYLISTS 
    } 
    expect(actions.fetchPopularPlaylists()).toEqual(expectedAction); 
  }); 
 
  it('should create an action for sending a message', () => { 
    const message = 'hello'; 
    const playlistId = 1; 
    const expectedAction = { 
      type: types.SEND_MESSAGE, 
      message, 
      playlistId 
    } 
    expect(actions.sendMessage(message, playlistId)).toEqual(expectedAction); 
  }); 
 
  it('should create an action for toggling login window', () => { 
    const expectedAction = { 
      type: types.TOGGLE_LOGIN_WINDOW 
    } 
    expect(actions.toggleLoginWindow()).toEqual(expectedAction); 
  }); 
 
  it('should create an action for toggling register window', () => { 
    const expectedAction = { 
      type: types.TOGGLE_REGISTER_WINDOW 
    } 
    expect(actions.toggleRegisterWindow()).toEqual(expectedAction); 
  }); 
 
  it('should create an action for toggling create playlist window', () => { 
    const expectedAction = { 
      type: types.TOGGLE_CREATE_PLAYLIST_WINDOW 
    } 
    expect(actions.toggleCreatePlaylistWindow()).toEqual(expectedAction); 
  }); 
 
  it('should create an action for toggling logout window', () => { 
    const expectedAction = { 
      type: types.TOGGLE_LOGOUT_WINDOW 
    } 
    expect(actions.toggleLogoutWindow()).toEqual(expectedAction); 
  }); 
 
  it('should create an action for closing all windows', () => { 
    const expectedAction = { 
      type: types.CLOSE_ALL_WINDOWS 
    } 
    expect(actions.closeAllWindows()).toEqual(expectedAction); 
  }); 
});