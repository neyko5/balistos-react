function results(state = {
    popular : [],
    youtube: [],
    playlists: []
}, action){
    switch(action.type){
        case "SET_PLAYLIST_RESULTS":
            return {
                ...state,
                playlists: action.results
            }
        case "SET_POPULAR_RESULTS":
            console.log("ACTION", action);
            return {
                ...state,
                popular: action.results
            }
        case "SET_YOUTUBE_RESULTS":
            return {
                ...state,
                youtube: action.results
            }
        default:
            return state;
    }
}

module.exports = results;
