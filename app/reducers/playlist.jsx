function playlist(state = {
    videos : [],
    results: []
}, action){
    switch(action.type){
        case "SET_VIDEOS":
            return {
                ...state,
                videos: action.videos
            }
        case "SET_RESULTS":
            console.log("dsd");
            return {
                ...state,
                results: action.results
            }
        default:
            return state;
    }
}

module.exports = playlist;