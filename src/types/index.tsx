

export interface Action {
    type: string;
};

export interface CreatePlaylistAction extends Action {
    title: string;
    description: string;
};

export interface SendLoginRequestAction extends Action {
    username: string;
    password: string;
};

export interface SendRegisterRequestAction extends Action {
    username: string;
    password: string;
};

export interface SetErrorMessageAction extends Action {
    message: string;
};

export interface FetchPlaylistAction extends Action {
    playlistId: string;
};

export interface SearchAction extends Action {
    query: string;
};
  
export interface AddVideoAction extends Action {
    title: string;
    youtubeId: string;
    playlistId: string;
    autoAdded: boolean;
};
  
export interface SendHeartbeatAction extends Action {
    playlist: string;
    username: string;
};

export interface GetActiveUsersAction extends Action {
    playlist: string;
};

export interface UpdateSearchIndexAction extends Action {
    value: number;
};

export interface ClearYoutubeResultsAction extends Action {
    results: Array<YoutubeResultVideoType>;
};

export interface VideoAction extends Action {
    videoId: number;
};

export interface YoutubeVideoAction extends Action {
    videoId: string;
};

export interface LikeVideoAction extends Action {
    videoId: number;
    value: number;
};

export interface SendMessageAction extends Action {
    message: string;
    playlistId: string;
};
  
export type UserType = {
    username: string,
}

export type LikeType = {
    id: number,
    value: number,
    user: UserType,
    userId: number
}

export type YoutubeVideoType = {
    youtubeId: string,
    title: string,
}

export type VideoType = {
    id: number,
    startedAt: number,
    video: YoutubeVideoType,
    likes: Array<LikeType>,
    user: UserType,
    autoAdded: boolean
}

export type PlaylistType = {
    current: VideoType,
    title: string,
    username: string,
    id: number,
    videos: Array<VideoType>,
    description: string,
}

export type ChatMessageType = {
    createdAt: string,
    message: string,
    id: string,
    user: UserType
}

export type YoutubeResultVideoType = {
    id: {
        videoId: string,
    },
    snippet: {
        title: string,
        thumbnails: {
            default: {
                url: string
            }
        },
    }
}
