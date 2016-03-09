

var {
  AUTH_SET_TOKEN,
  AUTH_DISCARD_TOKEN,
  AUTH_SET_USER
} = require('../constants');

function auth(state = {}, action){
  switch(action.type){
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case AUTH_DISCARD_TOKEN:
      return {};
    case AUTH_SET_USER:
      return {
        ...state,
        user
      };
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