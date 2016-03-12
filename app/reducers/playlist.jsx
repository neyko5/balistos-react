function playlist(state = {}, action){
    switch(action.type){
        case "SET_VIDEOS":
            return {
                ...state,
                videos: action.videos
            }
        default:
            return state;
    }
}

module.exports = playlist;