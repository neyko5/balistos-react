var VideoPlayer = require('./VideoPlayer');

let VideoPlayerContainer = (props) => {
    return (
        <div className="col-lg-7 col-md-6 col-sm-12 no-gutter">
            <div className="main_window">
                <VideoPlayer videos={props.playlist.videos} />
            </div>
        </div>
    );
};

module.exports = VideoPlayerContainer;
