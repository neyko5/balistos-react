var VideoList = require('./VideoList');

function VideoListContainer(props){
    return (
        <div className="sidebar col-lg-5 col-md-6 col-sm-7 col-xs-12 left-gutter">
            <div className="box first">
                <div className="header">
                    <i className="icon note"></i>
                    <div className="title"></div>
                </div>
                <div className="body">
                    <VideoList videos={props.videos} />
                </div>
            </div>
        </div>
    );
};

module.exports = VideoListContainer;
