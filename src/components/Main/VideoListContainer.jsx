import React from 'react';
import PropTypes from 'prop-types';
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
        <VideoList videos={props.playlist.current ? [props.playlist.current, ...props.playlist.videos] : []} />
      </div>
    </div>
  </div>
);

VideoListContainer.propTypes = {
  playlist: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.title,
    videos: PropTypes.arrayOf(
      PropTypes.object.isRequired,
    ).isRequired,
    current: PropTypes.object,
  }).isRequired,

};

VideoListContainer.defaultProps = {
  playlist: {
    username: undefined,
    id: undefined,
    current: undefined,
  },
};

module.exports = VideoListContainer;
