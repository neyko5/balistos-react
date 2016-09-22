function playlist(state = {
    videos : [],
    results: [],
    playlist_results: [],
    messages: [],
}, action){
    switch(action.type){
        case "SET_INITIAL_PLAYLIST_DATA":
            return {
                ...state,
                videos: action.playlist.playlistVideos,
                messages: action.playlist.chats,
                id: action.playlist.id,
                title: action.playlist.title
            }
        case "SET_CURRENT_PLAYLIST_ID":
            return {
                ...state,
                id: action.id
            }
        case "UPDATE_OR_INSERT_LIKE":
            return {
                ...state,
                videos: state.videos.map((video) => {
                          if(video.id === action.like.playlist_video_id){
                             if(video.likes.some((like) => like.user_id === action.like.user_id)){
                               video.likes = video.likes.map((like) => {
                                  if(like.user_id === action.like.user_id){
                                    return Object.assign({}, action.like);
                                  } else {
                                    return like;
                                  }
                               });
                             } else {
                                video.likes.push(action.like);
                             }
                             return Object.assign({}, video);
                          } else {
                            return video;
                          }
                        })
            }
        case "SET_RESULTS":
            return {
                ...state,
                results: action.results
            }
        case "SET_PLAYLIST_RESULTS":
            return {
                ...state,
                playlist_results: action.results
            }
        case "INSERT_VIDEO":
            return {
                ...state,
                videos: [...state.videos, action.video]
            }
        case "INSERT_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        default:
            return state;
    }
}

module.exports = playlist;
