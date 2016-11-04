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
            return {
                ...state,
                popular: action.results
            }
        case "SET_YOUTUBE_RESULTS":
            return {
                ...state,
                youtube: action.results
            }
        case "SET_YOUTUBE_SEARCH_QUERY":
            return {
                ...state,
                query: action.query
            }
        default:
            return state;
    }
}

module.exports = results;
