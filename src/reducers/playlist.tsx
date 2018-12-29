import * as actionTypes from '../constants/actionTypes';
import { LikeType, VideoType } from '../types';

function playlist(state: {
  videos: Array<VideoType>,
  results: Array<any>,
  playlistResults: Array<any>,
  messages: Array<any>,
  users: Array<any>,
  current?: VideoType
} = {
  videos: [],
  results: [],
  playlistResults: [],
  messages: [],
  users: [],
  current: undefined
}, action: any) {
  switch (action.type) {
    case actionTypes.SET_INITIAL_PLAYLIST_DATA: {
      const first = action.playlist.playlistVideos &&
        action.playlist.playlistVideos.sort((a: VideoType, b: VideoType) => {
          const diff = b.likes.reduce((total: number, like: LikeType) => total + like.value, 0) -
            a.likes.reduce((total: number, like: LikeType) => total + like.value, 0);
          return diff === 0 ? a.id - b.id : diff;
        })[0];
      let videos = action.playlist.playlistVideos ? action.playlist.playlistVideos.filter((video: VideoType) => !first || video.id !== first.id) : [];
      return {
        ...state,
        videos: videos,
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
        videos: state.videos.map((video: VideoType) => {
          let videoLikes = [];
          if (video.id === action.like.playlistVideoId) {
            if (video.likes.some((like: LikeType) => like.userId === action.like.userId)) {
              videoLikes = video.likes.map((like) => {
                if (like.userId === action.like.userId) {
                  return Object.assign({}, action.like);
                }
                return like;
              });
            } else {
              videoLikes.push(action.like);
            }
            return Object.assign({}, video, { likes: videoLikes });
          }
          return video;
        }),
      };
    case actionTypes.REMOVE_VIDEO:
      if (state && state.current && state.current.id === action.videoId) {
        const next: VideoType = state.videos.sort((a: VideoType, b: VideoType) => {
          const diff = b.likes.reduce((total: number, like: LikeType) => total + like.value, 0)
            - a.likes.reduce((total: number, like: LikeType) => total + like.value, 0);
          return diff === 0 ? a.id - b.id : diff;
        })[0];
        return {
          ...state,
          current: next,
          videos: state.videos.filter((video: VideoType) => !next || (next && video.id !== next.id)),
        };
      }

      return {
        ...state,
        videos: state.videos.filter((video: VideoType) => video.id !== action.videoId),
      };

    case actionTypes.DEACTIVATE_VIDEO:
      return {
        ...state,
        videos: state.videos.filter((video: VideoType) => video.id !== action.videoId),
      };
    case actionTypes.SELECT_NEXT_VIDEO: {
      const next: VideoType = state.videos.sort((a: VideoType, b: VideoType) => {
        const diff = b.likes.reduce((total: number, like: LikeType) => total + like.value, 0) -
         a.likes.reduce((total: number, like: LikeType) => total + like.value, 0);
        return diff === 0 ? a.id - b.id : diff;
      })[0];
      return {
        ...state,
        current: next,
        videos: state.videos.filter((video: VideoType) => !next || (next && video.id !== next.id)),
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
