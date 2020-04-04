import axios from 'axios';

export function searchYoutubeVideos(query: string) {
    return axios
        .create({
            baseURL: 'https://www.googleapis.com',
        })
        .get('/youtube/v3/search', {
            params: {
                q: query,
                key: process.env.REACT_APP_YOUTUBE_API_KEY,
                part: 'snippet',
                type: 'video',
                videoSyndicated: true,
                videoEmbeddable: true,
            },
        })
        .then((response) => {
            return response.data.items;
        });
}

export function getRelatedYouTubeVideos(videoId: string) {
    return axios
        .create({
            baseURL: 'https://www.googleapis.com',
        })
        .get('/youtube/v3/search', {
            params: {
                relatedToVideoId: videoId,
                key: process.env.REACT_APP_YOUTUBE_API_KEY,
                part: 'snippet',
                type: 'video',
                maxResults: 10,
                videoSyndicated: true,
                videoEmbeddable: true,
            },
        })
        .then((response) => {
            return response.data.items;
        });
}
