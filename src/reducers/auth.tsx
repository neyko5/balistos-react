import * as actionTypes from "../constants/actionTypes";

function auth(state = {}, action: any) {
  switch (action.type) {
    case actionTypes.AUTH_SET_FROM_STORAGE:
      return {
        ...state,
        token: action.token,
        username: action.username,
        userId: action.userId,
        loggedIn: true,
      };
    case actionTypes.LOG_OUT:
      return {
        token: undefined,
        username: undefined,
        loggedIn: false,
        userId: undefined,
      };
    case actionTypes.SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.message,
        registerError: undefined,
      };
    case actionTypes.SET_REGISTER_ERROR:
      return {
        ...state,
        registerError: action.message,
        loginError: undefined,
      };
    case actionTypes.POST_LOGIN:
      return {
        ...state,
        username: action.username,
        token: action.token,
        userId: action.userId,
        loggedIn: true,
        registerError: undefined,
        loginError: undefined,
      };
    default:
      return state;
  }
}

export default auth;
