
export interface Action {
    type: string;
}

export interface CreatePlaylistAction extends Action {
    title: string;
    description: string;
}

export interface SendLoginRequestAction extends Action {
    username: string;
    password: string;
}

export interface SendRegisterRequestAction extends Action {
    username: string;
    password: string;
}

export interface SetErrorMessageAction extends Action {
    message: string;
}

export interface FetchPlaylistAction extends Action {
    playlistId: string;
}

export interface SearchAction extends Action {
    query: string;
}

export interface AddVideoAction extends Action {
    title: string;
    youtubeId: string;
    playlistId: string;
    autoAdded: boolean;
}

export interface SendHeartbeatAction extends Action {
    playlist: string;
    username: string;
}

export interface GetActiveUsersAction extends Action {
    playlist: string;
}

export interface UpdateSearchIndexAction extends Action {
    value: number;
}

export interface ClearYoutubeResultsAction extends Action {
    results: YoutubeResultVideoType[];
}

export interface VideoAction extends Action {
    videoId: number;
}

export interface YoutubeVideoAction extends Action {
    videoId: string;
}

export interface LikeVideoAction extends Action {
    videoId: number;
    value: number;
}

export interface SendMessageAction extends Action {
    message: string;
    playlistId: string;
}

export interface UserType {
    username: string;
}

export interface LikeType {
    id: number;
    value: number;
    user: UserType;
    userId: number;
}

export interface YoutubeVideoType {
    youtubeId: string;
    title: string;
}

export interface VideoType {
    id: number;
    startedAt: number;
    video: YoutubeVideoType;
    likes: LikeType[];
    user: UserType;
    autoAdded: boolean;
}

export interface PlaylistType {
    current: VideoType;
    title: string;
    username: string;
    id: number;
    videos: VideoType[];
    description: string;
}

export interface ChatMessageType {
    createdAt: string;
    message: string;
    id: string;
    user: UserType;
}

export interface YoutubeResultVideoType {
    id: {
        videoId: string,
    };
    snippet: {
        title: string,
        thumbnails: {
            default: {
                url: string,
            },
        },
    };
}

export interface SetAuthDataFromStorage extends Action {
    token: string;
    username: string;
    loggedIn: boolean;
    userId: number;
}
