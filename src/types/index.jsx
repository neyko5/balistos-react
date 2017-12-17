// @flow

export type Action = {
    type: string,
};

export type UserType = {
    username: string,
}

export type LikeType = {
    id: number,
    value: number,
    user: UserType,
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
