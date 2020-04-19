export type UserType = {
    id: string;
    name: string;
};

export type AuthUserType = {
    uid: string;
    displayName: string;
    photoURL: string;
};

export type LikeType = {
    id: number;
    value: number;
    user: UserType;
    userId: number;
};

export type VideoType = {
    id: string;
    started_at: number;
    youtube_id: string;
    title: string;
    likes: string[];
    creator: UserType;
    auto_added: boolean;
    created_at: number;
    finished: boolean;
};

export type PlaylistType = {
    current: VideoType;
    title: string;
    creator: UserType;
    id: number;
    videos: VideoType[];
    description: string;
};

export type ChatMessageType = {
    created_at: string;
    message: string;
    creator: UserType;
    id: string;
};

export type YoutubeResultVideoType = {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        thumbnails: {
            default: {
                url: string;
            };
        };
    };
};
