export const youtubeParams: any = {
  height: '390',
  width: '640',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    controls: 0,
    referer: 'https://www.youtube.com',
    origin: 'https://www.youtube.com',
    rel: 0,
    showinfo: 0,
  },
};

export const API_INDEX = process.env.REACT_APP_API_ENDPOINT === 'local' ? 'http://localhost:4000' : 'https://api.balistos.com';
