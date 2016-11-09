function results(state = {
    popular : [],
    youtube: [],
    playlists: [],
    youtube_index: 0
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
                youtube_index: 0,
                youtube: action.results
            }
        case "UPDATE_SEARCH_INDEX":
            return {
                ...state,
                youtube_index: state.youtube_index + action.value
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
