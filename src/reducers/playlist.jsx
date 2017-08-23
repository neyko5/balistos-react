import * as actionTypes from '../constants/actionTypes';

function playlist(state = {
  videos: [],
  results: [],
  playlistResults: [],
  messages: [],
  users: [],
}, action) {
  switch (action.type) {
    case actionTypes.SET_INITIAL_PLAYLIST_DATA: {
      const first = action.playlist.playlistVideos &&
        action.playlist.playlistVideos.sort((a, b) => {
          const diff = b.likes.reduce((total, like) => total + like.value, 0) -
            a.likes.reduce((total, like) => total + like.value, 0);
          return diff === 0 ? a.id - b.id : diff;
        })[0];
      return {
        videos: (action.playlist.playlistVideos &&
          action.playlist.playlistVideos.filter(video => !first || video.id !== first.id)) || [],
        current: first,
        messages: action.playlist.chats,
        users: action.playlist.playlistUsers,
        id: action.playlist.id,
        title: action.playlist.title,
        username: action.playlist.user.username,
      };
    }
    case actionTypes.UPDATE_OR_INSERT_LIKE:
      return {
        ...state,
        videos: state.videos.map((video) => {
          if (video.id === action.like.playlistVideoId) {
            if (video.likes.some(like => like.userId === action.like.userId)) {
              video.likes = video.likes.map((like) => {
                if (like.userId === action.like.userId) {
                  return Object.assign({}, action.like);
                }
                return like;
              });
            } else {
              video.likes.push(action.like);
            }
            return Object.assign({}, video);
          }
          return video;
        }),
      };
    case actionTypes.REMOVE_VIDEO:
      if (state.current.id === action.videoId) {
        const next = state.videos.sort((a, b) => {
          const diff = b.likes.reduce((total, like) => total + like.value, 0)
            - a.likes.reduce((total, like) => total + like.value, 0);
          return diff === 0 ? a.id - b.id : diff;
        })[0];
        return {
          ...state,
          current: next,
          videos: state.videos.filter(video => !next || video.id !== next.id),
        };
      }

      return {
        ...state,
        videos: state.videos.filter(video => video.id !== action.videoId),
      };

    case actionTypes.DEACTIVATE_VIDEO:
      return {
        ...state,
        videos: state.videos.filter(video => video.id !== action.videoId),
      };
    case actionTypes.SELECT_NEXT_VIDEO: {
      const next = state.videos.sort((a, b) => {
        const diff = b.likes.reduce((total, like) => total + like.value, 0) -
         a.likes.reduce((total, like) => total + like.value, 0);
        return diff === 0 ? a.id - b.id : diff;
      })[0];
      return {
        ...state,
        current: next,
        videos: state.videos.filter(video => !next || video.id !== next.id),
      };
    }

    case actionTypes.INSERT_VIDEO:
      if (state.current) {
        return {
          ...state,
          videos: [...state.videos, action.video],
        };
      }

      return {
        ...state,
        current: action.video,
      };


    case actionTypes.INSERT_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case actionTypes.SET_ACTIVE_USERS:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
}

export default playlist;
