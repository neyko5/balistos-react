import React from 'react';
import { connect } from 'react-redux';
import { likeVideo, deleteVideo } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  user_id: state.auth.user_id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  likeVideo: (value) => {
    dispatch(likeVideo(ownProps.video.id, value));
  },
  deleteVideo: (videoId) => {
    dispatch(deleteVideo(videoId));
  },
});

class VideoListItem extends React.Component {
  deleteCurrentVideo() {
    this.props.deleteVideo(this.props.video.id);
  }
  render() {
    const upLike = this.props.video.likes
      .some(like => like.user_id === this.props.user_id && like.value === 1);
    const downLike = this.props.video.likes
      .some(like => like.user_id === this.props.user_id && like.value === -1);
    const likeCount = this.props.video.likes
      .reduce((total, like) => total + like.value, 0);
    return (
      <div className="playlist_item">
        {this.props.user_id ? <div className="vote">
          <div
            className={`up ${upLike ? 'active' : ''}`}
            click={() => this.props.likeVideo(upLike ? 0 : 1)}
            title={this.props.video.likes.filter(like => like.value === 1)
              .map(like => like.user.username).join(', ')}
          />
          <div className="number">{likeCount}</div>
          <div
            className={`down ${downLike ? 'active' : ''}`}
            click={() => this.props.likeVideo(downLike ? 0 : -1)}
            title={this.props.video.likes.filter(like => like.value === -1)
              .map(like => like.user.username).join(', ')}
          />
        </div> :
        <div className="vote">
          <div className="number full">{likeCount}</div>
        </div>}
        <img src={`https://img.youtube.com/vi/${this.props.video.video.youtube_id}/0.jpg`} alt={this.props.video..video.title} />
        <div className="info">
          <a
            className="title" target="_blank"
            rel="noopener noreferrer"
            title={'Open in YouTube'}
            href={`https://www.youtube.com/watch?v=${this.props.video.video.youtube_id}`}
          >{this.props.video.video.title}</a>
          <div className="addedby">added by <span className="black">{this.props.video.user.username}</span></div>
        </div>
        {this.props.user_id ? <div className="delete-column">
          <div className="delete" onClick={this.deleteCurrentVideo} />
        </div> : null}
      </div>
    );
  }
}

VideoListItem.propTypes = {
  user_id: React.propTypes.string.isRequired,
  deleteVideo: React.PropTypes.function.isRequired,
  likeVideo: React.PropTypes.function.isRequired,
  video: React.PropTypes.shape({
    id: React.PropTypes.shape({
      videoId: React.propTypes.string.isRequired,
    }).isRequired,
    video: React.PropTypes.shape({
      youtube_id: React.propTypes.string.isRequired,
      title: React.propTypes.string.isRequired,
    }).isRequired,
    likes: React.propTypes.arrayof(
      React.PropTypes.shape({
        value: React.propTypes.number,
      }),
    ).isRequired,
    user: React.PropTypes.shape({
      username: React.propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoListItem);
