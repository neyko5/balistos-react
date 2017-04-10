import React from 'react';
import { connect } from 'react-redux';
import RelatedVideoItem from './RelatedVideoItem';

function mapStateToProps(state) {
  return {
    related: state.results.related,
    id: state.playlist.id,
  };
}

const RelatedVideos = props => (
  <div className="box first">
    <div className="header">
      <i className="icon note" />
      <div className="title">Related videos</div>
    </div>
    <div className="body">
      {props.related.map(video => <RelatedVideoItem
        video={video}
        id={props.id}
        key={video.id.videoId}
      />)}
    </div>
  </div>
);

RelatedVideos.propTypes = {
  id: React.PropTypes.string.isRequired,
  related: React.propTypes.arrayof(
    React.PropTypes.shape({
      id: React.PropTypes.shape({
        videoId: React.PropTypes.videoId.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps, undefined)(RelatedVideos);
