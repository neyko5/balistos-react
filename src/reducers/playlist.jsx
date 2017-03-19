function playlist(state = {
    videos : [],
    results: [],
    playlist_results: [],
    messages: [],
    users: []
}, action){
    switch(action.type){
        case "SET_INITIAL_PLAYLIST_DATA":
            let first = action.playlist.playlistVideos && action.playlist.playlistVideos.sort((a, b) => {
                var diff = b.likes.reduce((total, like) => total + like.value, 0) - a.likes.reduce((total, like) => total + like.value, 0);
                return diff === 0 ? a.id - b.id : diff;
            })[0];
            return {
                videos: (action.playlist.playlistVideos && action.playlist.playlistVideos.filter(video => !first || video.id !== first.id)) || [],
                current: first,
                messages: action.playlist.chats,
                users: action.playlist.playlistUsers,
                id: action.playlist.id,
                title: action.playlist.title,
                username: action.playlist.user.username,
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
        case "REMOVE_VIDEO":
            if(state.current.id === action.video_id) {
                let next = state.videos.sort((a, b) => {
                    var diff = b.likes.reduce((total, like) => total + like.value, 0) - a.likes.reduce((total, like) => total + like.value, 0);
                    return diff === 0 ? a.id - b.id : diff;
                })[0];
                return {
                    ...state,
                    current: next,
                    videos: state.videos.filter(video => !next || video.id !== next.id)
                }
            }
            else{
                return {
                    ...state,
                    videos: state.videos.filter(video => video.id !== action.video_id)
                }
            }
        case "DEACTIVATE_VIDEO":
            return {
                ...state,
                videos: state.videos.filter(video => video.id !== action.video_id)
            }
        case "SELECT_NEXT_VIDEO":
            let next = state.videos.sort((a, b) => {
                var diff = b.likes.reduce((total, like) => total + like.value, 0) - a.likes.reduce((total, like) => total + like.value, 0);
                return diff === 0 ? a.id - b.id : diff;
            })[0];
            return {
                ...state,
                current: next,
                videos: state.videos.filter(video => !next || video.id !== next.id)
            }
        case "INSERT_VIDEO":
            if(state.current){
                return {
                    ...state,
                    videos: [...state.videos, action.video]
                }
            }
            else {
                return {
                    ...state,
                    current: action.video
                }
            }

        case "INSERT_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        case "SET_ACTIVE_USERS":
           return {
               ...state,
               users: action.users
           }
        default:
            return state;
    }
}

module.exports = playlist;
