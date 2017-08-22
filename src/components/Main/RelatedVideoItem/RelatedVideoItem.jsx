import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addVideo, getRelatedVideos } from '../../../actions';

import './RelatedVideoItem.css';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  id: state.playlist.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addVideo: () => {
    dispatch(addVideo(ownProps.video.id.videoId, ownProps.video.snippet.title, ownProps.id, false));
    dispatch(getRelatedVideos(ownProps.video.id.videoId));
  },
});

const RelatedVideoItem = props => (
  <div className="playlist_item related col-lg-12 col-md-12 col-sm-6">
    <img src={`https://img.youtube.com/vi/${props.video.id.videoId}/0.jpg`} alt={props.video.snippet.title} />
    <div className="info">
      <a
        className="title" rel="noopener noreferrer"
        target="_blank" title={'Open in YouTube'}
        href={`https://www.youtube.com/watch?v=${props.video.id.videoId}`}
      >{props.video.snippet.title}</a>
    </div>
    <button className="button-add" onClick={props.addVideo}> Add</button>
  </div>
);

RelatedVideoItem.propTypes = {
  addVideo: PropTypes.func.isRequired,
  video: PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }).isRequired,
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedVideoItem);
