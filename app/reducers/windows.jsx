function windows(state = {}, action){
    switch(action.type){
      case "TOGGLE_LOGIN_WINDOW":
          return {
            login_open: !state.login_open
          }
      case "TOGGLE_REGISTER_WINDOW":
          return {
            register_open: !state.register_open
          }
      case "TOGGLE_LOGOUT_WINDOW":
          return {
            logout_open: !state.logout_open
          }
      case "TOGGLE_CREATE_PLAYLIST_WINDOW":
          return {
            create_playlist_open: !state.create_playlist_open
          }  
      default:
        return state;
    }
}

module.exports = windows;