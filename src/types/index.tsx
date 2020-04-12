export interface UserType {
    id: string;
    name: string;
}

export interface AuthUserType {
    uid: string;
    displayName: string;
    photoURL: string;
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
    id: string;
    startedAt: number;
    youtubeId: string;
    title: string;
    likes: string[];
    creator: UserType;
    autoAdded: boolean;
}

export interface PlaylistType {
    current: VideoType;
    title: string;
    creator: UserType;
    id: number;
    videos: VideoType[];
    description: string;
}

export interface ChatMessageType {
    created_at: string;
    message: string;
    creator: UserType;
    id: string;
}

export interface YoutubeResultVideoType {
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
}
