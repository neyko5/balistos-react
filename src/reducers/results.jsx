import * as actionTypes from '../constants/actionTypes';

function results(state = {
  popular: [],
  youtube: [],
  playlists: [],
  related: [],
  youtubeIndex: 0,
}, action) {
  switch (action.type) {
    case actionTypes.SET_PLAYLIST_RESULTS:
      return {
        ...state,
        playlists: action.results,
      };
    case actionTypes.SET_POPULAR_RESULTS:
      return {
        ...state,
        popular: action.results,
      };
    case actionTypes.SET_YOUTUBE_RESULTS:
      return {
        ...state,
        youtubeIndex: 0,
        youtube: action.results,
      };
    case actionTypes.UPDATE_SEARCH_INDEX:
      return {
        ...state,
        youtubeIndex: state.youtubeIndex + action.value,
      };
    case actionTypes.SET_YOUTUBE_SEARCH_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case actionTypes.SET_RELATED_RESULTS:
      return {
        ...state,
        related: action.results,
      };
    default:
      return state;
  }
}

module.exports = results;
