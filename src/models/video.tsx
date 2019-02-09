import { VideoType, UserType, LikeType, YoutubeVideoType } from "../types";

export class Video {
    id: number;
    startedAt: number;
    video: YoutubeVideoType;
    likes: Array<LikeType>;
    user: UserType;
    autoAdded: boolean;

    constructor(data: VideoType) {
        this.id = data.id;
        this.video = data.video;
        this.startedAt = data.startedAt;
        this.likes = data.likes;
        this.user = data.user;
        this.autoAdded = data.autoAdded;
    }

    get likeCount() {
        return this.likes.reduce((total: number, like: LikeType) => total + like.value, 0)
    }
}