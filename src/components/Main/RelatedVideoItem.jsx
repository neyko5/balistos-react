import React from 'react';
import { connect } from 'react-redux';
import { addVideo, getRelatedVideos } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  user_id: state.auth.user_id,
  id: state.playlist.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addVideo: () => {
    dispatch(addVideo(ownProps.video.id.videoId, ownProps.video.snippet.title, ownProps.id));
    dispatch(getRelatedVideos(ownProps.video.id.videoId));
  },
});

const RelatedVideoItem = props => (
  <div className="playlist_item">
    <img src={`https://img.youtube.com/vi/${props.video.id.videoId}/0.jpg`} alt={props.video.snippet.title} />
    <div className="info">
      <a
        className="title" rel="noopener noreferrer"
        target="_blank" title={'Open in YouTube'}
        href={`https://www.youtube.com/watch?v=${props.video.id.videoId}`}
      >{props.video.snippet.title}</a>
    </div>
    <button className="button green chat" onClick={props.addVideo}> Add</button>
  </div>

);

RelatedVideoItem.propTypes = {
  addVideo: React.PropTypes.function.isRequired,
  video: React.PropTypes.shape({
    id: React.PropTypes.shape({
      videoId: React.propTypes.string.isRequired,
    }).isRequired,
    snippet: React.PropTypes.shape({
      title: React.propTypes.string.isRequired,
    }).isRequired,
    messages: React.propTypes.arrayof(React.PropTypes.element.isRequired).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedVideoItem);
