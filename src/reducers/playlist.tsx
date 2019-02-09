import * as actionTypes from '../constants/actionTypes';
import { LikeType, VideoType } from '../types';
import { Video } from '../models/video';

function playlist(state: {
  videos: Array<VideoType>,
  results: Array<any>,
  playlistResults: Array<any>,
  messages: Array<any>,
  users: Array<any>,
} = {
  videos: [],
  results: [],
  playlistResults: [],
  messages: [],
  users: []
}, action: any) {
  switch (action.type) {
    case actionTypes.SET_INITIAL_PLAYLIST_DATA: {
      let videos = action.playlist.playlistVideos.map((video: VideoType) => new Video(video)).sort((a: Video, b: Video) => {
        const diff = b.likeCount - a.likeCount;
        return diff === 0 ? a.id - b.id : diff;
      });
      return {
        ...state,
        videos: videos,
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
      return {
        ...state,
        videos: state.videos.filter((video: VideoType) => video.id !== action.videoId)
      };

    case actionTypes.DEACTIVATE_VIDEO:
      return {
        ...state,
        videos: state.videos.filter((video: VideoType) => video.id !== action.videoId),
      };
    case actionTypes.SELECT_NEXT_VIDEO: {
      return {
        ...state,
        videos: state.videos.slice(1)
      };
    }

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
