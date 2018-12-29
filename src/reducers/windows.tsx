import * as actionTypes from '../constants/actionTypes';
import { Action } from '../types';

function windows(state = {
  createPlaylistOpen: false,
  logoutOpen: false,
  loginOpen: false,
  registerOpen: false,
}, action: Action) {
  switch (action.type) {
    case actionTypes.TOGGLE_LOGIN_WINDOW:
      return {
        ...state,
        loginOpen: !state.loginOpen,
      };
    case actionTypes.TOGGLE_REGISTER_WINDOW:
      return {
        ...state,
        registerOpen: !state.registerOpen,
      };
    case actionTypes.TOGGLE_LOGOUT_WINDOW:
      return {
        ...state,
        logoutOpen: !state.logoutOpen,
      };
    case actionTypes.TOGGLE_CREATE_PLAYLIST_WINDOW:
      return {
        ...state,
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
