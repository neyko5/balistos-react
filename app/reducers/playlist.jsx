function playlist(state = {
    videos : [],
    results: [],
    playlist_results: [],
    messages: []
}, action){
    switch(action.type){
        case "SET_INITIAL_PLAYLIST_DATA":
            return {
                ...state,
                videos: action.videos,
                messages: action.messages
            }
        case "SET_RESULTS":
            console.log("dsd");
            return {
                ...state,
                results: action.results
            }
        case "SET_PLAYLIST_RESULTS":
            return {
                ...state,
                playlist_results: action.results
            }
        default:
            return state;
    }
}

module.exports = playlist;
