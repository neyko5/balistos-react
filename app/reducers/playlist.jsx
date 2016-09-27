function playlist(state = {
    videos : [],
    results: [],
    playlist_results: [],
    messages: [],
    users: []
}, action){
    switch(action.type){
        case "SET_INITIAL_PLAYLIST_DATA":
            return {
                videos: action.playlist.playlistVideos,
                messages: action.playlist.chats,
                users: action.playlist.playlistUsers,
                id: action.playlist.id,
                title: action.playlist.title,
                username: action.playlist.user.username
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
        case "ADD_USER":
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case "REMOVE_USER":
            return {
                ...state,
                users: state.users.map((user) => {
                  if(user.username !== action.user.username){
                    return user;
                  }
                })
            }
        default:
            return state;
    }
}

module.exports = playlist;
