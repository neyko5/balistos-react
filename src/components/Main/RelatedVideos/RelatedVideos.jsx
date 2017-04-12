import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RelatedVideoItem from '../RelatedVideoItem';

import './RelatedVideos.css';

function mapStateToProps(state) {
  return {
    related: state.results.related,
    id: state.playlist.id,
  };
}

const RelatedVideos = props => (
  <div className="box related">
    <div className="header">
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
  id: PropTypes.number,
  related: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.shape({
        videoId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

RelatedVideos.defaultProps = {
  id: undefined,
};

export default connect(mapStateToProps, undefined)(RelatedVideos);
