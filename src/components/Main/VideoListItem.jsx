import React from 'react';
import PropTypes from 'prop-types';
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

    let playlistItemStatus = '';
    let playlistItemClass = '';
    if (this.props.index === 0) {
      playlistItemClass = 'first';
      playlistItemStatus = 'Now playing';
    } else if (this.props.index === 1) {
      playlistItemClass = 'next';
      playlistItemStatus = 'Next';
    }

    return (
      <div className={`playlist_item ${playlistItemClass}`}>
        {this.props.user_id ? <div className="vote">
          <button
            className={`up ${upLike ? 'active' : ''}`}
            onClick={() => this.props.likeVideo(upLike ? 0 : 1)}
            title={this.props.video.likes.filter(like => like.value === 1)
              .map(like => like.user.username).join(', ')}
          />
          <div className="number">{likeCount}</div>
          <button
            className={`down ${downLike ? 'active' : ''}`}
            onClick={() => this.props.likeVideo(downLike ? 0 : -1)}
            title={this.props.video.likes.filter(like => like.value === -1)
              .map(like => like.user.username).join(', ')}
          />
        </div> :
        <div className="vote">
          <div className="number full">{likeCount}</div>
        </div>}
        <div className="img-wrapper">
          <div className="status">{playlistItemStatus}</div>
          <img src={`https://img.youtube.com/vi/${this.props.video.video.youtube_id}/0.jpg`} alt={this.props.video.video.title} />
        </div>
        <div className="info">
          <a
            className="title" target="_blank"
            rel="noopener noreferrer"
            title={'Open in YouTube'}
            href={`https://www.youtube.com/watch?v=${this.props.video.video.youtube_id}`}
          >{this.props.video.video.title}</a>
          <div className="addedby">
            added by <span className="black">{this.props.video.user.username}</span>
          </div>
        </div>
        {this.props.user_id ? <div className="delete-column">
          <button className="delete" onClick={this.deleteCurrentVideo} />
        </div> : null}
      </div>
    );
  }
}

VideoListItem.propTypes = {
  index: PropTypes.number.isRequired,
  user_id: PropTypes.number,
  deleteVideo: PropTypes.func.isRequired,
  likeVideo: PropTypes.func.isRequired,
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    video: PropTypes.shape({
      youtube_id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
      }),
    ).isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

VideoListItem.defaultProps = {
  user_id: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoListItem);
