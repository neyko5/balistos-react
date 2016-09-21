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
                videos: action.videos,
                messages: action.chats,
                id: action.id
            }
        case "SET_CURRENT_PLAYLIST_URI":
            return {
                ...state,
                uri: action.uri
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
