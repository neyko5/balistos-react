import VideoListItem from './VideoListItem';

let VideoList = (props) => {
    if(props.videos.empty){
        return <div className="empty_item" >Playlist is empty. Please search and add a video.</div>
    }
    else{
        return (
            <div className="video-list">
                {props.videos.sort((a, b) => {
                    var diff = b.likes.reduce((total, like) => total + like.value, 0) - a.likes.reduce((total, like) => total + like.value, 0);
                    return diff === 0 ? a.id - b.id : diff;
                }).map(function(video) {
                  return <VideoListItem video={video} key={video.id} />;
                })}
            </div>
        );
    }

};

module.exports = VideoList;
