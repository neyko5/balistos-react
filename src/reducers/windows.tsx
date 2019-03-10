import * as actionTypes from "../constants/actionTypes";
import { Action } from "../types";

function windows(state = {
  createPlaylistOpen: false,
  logoutOpen: false,
  loginOpen: false,
  registerOpen: false,
},               action: Action) {
  switch (action.type) {
    case actionTypes.TOGGLE_LOGIN_WINDOW:
      return {
        createPlaylistOpen: false,
        logoutOpen: false,
        registerOpen: false,
        loginOpen: !state.loginOpen,
      };
    case actionTypes.TOGGLE_REGISTER_WINDOW:
      return {
        createPlaylistOpen: false,
        logoutOpen: false,
        loginOpen: false,
        registerOpen: !state.registerOpen,
      };
    case actionTypes.TOGGLE_LOGOUT_WINDOW:
      return {
        createPlaylistOpen: false,
        loginOpen: false,
        registerOpen: false,
        logoutOpen: !state.logoutOpen,
      };
    case actionTypes.TOGGLE_CREATE_PLAYLIST_WINDOW:
      return {
        logoutOpen: false,
        loginOpen: false,
        registerOpen: false,
        createPlaylistOpen: !state.createPlaylistOpen,
      };
    case actionTypes.CLOSE_ALL_WINDOWS: {
      return {
        createPlaylistOpen: false,
        logoutOpen: false,
        loginOpen: false,
        registerOpen: false,
      };
    }
    default:
      return state;
  }
}

export default windows;
