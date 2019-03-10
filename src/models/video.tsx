import { LikeType, UserType, VideoType, YoutubeVideoType } from "../types";

export class Video {
    public id: number;
    public startedAt: number;
    public video: YoutubeVideoType;
    public likes: LikeType[];
    public user: UserType;
    public autoAdded: boolean;

    constructor(data: VideoType) {
        this.id = data.id;
        this.video = data.video;
        this.startedAt = data.startedAt;
        this.likes = data.likes;
        this.user = data.user;
        this.autoAdded = data.autoAdded;
    }

    get likeCount() {
        return this.likes.reduce((total: number, like: LikeType) => total + like.value, 0);
    }
}
