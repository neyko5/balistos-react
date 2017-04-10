import React from 'react';
import VideoList from './VideoList';
import SearchVideo from '../Header/SearchVideo';

const VideoListContainer = props => (
  <div className="col-lg-12 col-md-12 col-sm-7 col-xs-12 no-gutter">
    <SearchVideo id={props.playlist.id} />
    <div className="box first">
      <div className="header">
        <i className="icon note" />
        <div className="title">
          {props.playlist.title}
          <span>created by {props.playlist.username}</span>
        </div>
      </div>
      <div className="body">
        <VideoList videos={props.playlist.videos} />
      </div>
    </div>
  </div>
);

VideoListContainer.propTypes = {
  playlist: React.propTypes.shape({
    username: React.propTypes.string.isRequired,
    id: React.propTypes.string.isRequired,
    title: React.propTypes.title,
    videos: React.propTypes.arrayof(
      React.PropTypes.element.isRequired,
    ).isRequired,
  }).isRequired,

};

module.exports = VideoListContainer;
