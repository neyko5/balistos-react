import React from 'react';
import { connect } from 'react-redux';
import RelatedVideoItem from './RelatedVideoItem';

function mapStateToProps(state) {
  return {
    related: state.results.related,
    id: state.playlist.id,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
});

const RelatedVideos = React.createClass({
  render() {
    return (
      <div className="box first">
        <div className="header">
          <i className="icon note" />
          <div className="title">Related videos</div>
        </div>
        <div className="body">
          {this.props.related.map(video => <RelatedVideoItem video={video} id={this.props.id} key={video.id.videoId} />)}
        </div>
      </div>
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RelatedVideos);
