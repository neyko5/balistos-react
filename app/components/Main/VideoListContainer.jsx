var VideoList = require('./VideoList');

let VideoListContainer = (props) => {
    return (
        <div className="sidebar col-lg-5 col-md-6 col-sm-7 col-xs-12 left-gutter">
            <div className="box first">
                <div className="header">
                    <i className="icon note"></i>
                    <div className="title">{props.playlist.title} <span>created by {props.playlist.username}</span></div>
                </div>
                <div className="body">
                    <VideoList videos={props.playlist.videos} />
                </div>
            </div>
        </div>
    );
};

module.exports = VideoListContainer;
