function playlist(state = {}, action){
  switch(action.type){
    case "CHANGE_PLAYLIST":
        return {
          ...state,
          playlist: action.playlist
        }
    default:
      return state;
  }
}

module.exports = playlist;