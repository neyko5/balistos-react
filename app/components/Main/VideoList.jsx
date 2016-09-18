import VideoListItem from './VideoListItem';

var VideoList = React.createClass({
    getDefaultProps: function() {
        return {
            videos: []
        };
    },
    render: function() {
        if(this.props.videos.empty){
            return <div className="empty_item" >Playlist is empty. Please search and add a video.</div>
        }
        else{
            return (
                <div className="video-list">
                    {this.props.videos.map(function(result) {
                      return <VideoListItem data={result.video} key={result.video.id} />;
                    })}
                </div>
            );
        }
    }
});

module.exports = VideoList;
