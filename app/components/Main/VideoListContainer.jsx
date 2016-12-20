var VideoList = require('./VideoList');
import SearchVideo from '../Header/SearchVideo';

let VideoListContainer = (props) => {
    console.log(SearchVideo);
    return (
        <div className="col-lg-12 col-md-12 col-sm-7 col-xs-12 no-gutter">
            <SearchVideo id={props.playlist.id}/>
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
