function auth(state = {
   token: localStorage.getItem('token') || null,
   username: localStorage.getItem('username') || null,
   logged_in: localStorage.getItem('token')?true:false
}, action){
  switch(action.type){
    case "AUTH_SET_FROM_STORAGE":
      return {
        ...state,
        token: action.token,
        username: action.username,
        logged_in: true
      };
    case "LOG_OUT":
      return {};
    case "POST_LOGIN":
        return {
          ...state,
          username: action.username,
          token: action.token,
          logged_in: true
    }      
    default:
      return state;
  }
}

module.exports = auth;