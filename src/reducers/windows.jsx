import * as actionTypes from '../constants/actionTypes';

function windows(state = {
  createPlaylistOpen: false,
  logoutOpen: false,
  loginOpen: false,
  registerOpen: false,
}, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_LOGIN_WINDOW:
      return {
        loginOpen: !state.loginOpen,
      };
    case actionTypes.TOGGLE_REGISTER_WINDOW:
      return {
        registerOpen: !state.registerOpen,
      };
    case actionTypes.TOGGLE_LOGOUT_WINDOW:
      return {
        logoutOpen: !state.logoutOpen,
      };
    case actionTypes.TOGGLE_CREATE_PLAYLIST_WINDOW:
      return {
        createPlaylistOpen: !state.createPlaylistOpen,
      };
    case actionTypes.CLOSE_ALL_WINDOWS: {
      return {};
    }
    default:
      return state;
  }
}

module.exports = windows;
