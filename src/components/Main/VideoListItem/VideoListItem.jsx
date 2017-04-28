import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { likeVideo, deleteVideo } from '../../../actions';

import './VideoListItem.css';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  likeVideo: (value) => {
    dispatch(likeVideo(ownProps.video.id, value));
  },
  deleteVideo: (videoId) => {
    dispatch(deleteVideo(videoId));
  },
});

const VideoListItem = (props) => {
  const upLike = props.video.likes
    .some(like => like.userId === props.userId && like.value === 1);
  const downLike = props.video.likes
    .some(like => like.userId === props.userId && like.value === -1);
  const likeCount = props.video.likes
    .reduce((total, like) => total + like.value, 0);

  let playlistItemStatus = '';
  let playlistItemClass = '';
  if (props.index === 0) {
    playlistItemClass = 'first';
    playlistItemStatus = 'Now playing';
  } else if (props.index === 1) {
    playlistItemClass = 'next';
    playlistItemStatus = 'Next';
  }

  return (
    <div className={`playlist_item ${playlistItemClass}`}>
      {props.userId ? <div className="vote">
        <button
          className={`up ${upLike ? 'active' : ''}`}
          onClick={() => props.likeVideo(upLike ? 0 : 1)}
          title={props.video.likes.filter(like => like.value === 1)
            .map(like => like.user.username).join(', ')}
        />
        <div className="number">{likeCount}</div>
        <button
          className={`down ${downLike ? 'active' : ''}`}
          onClick={() => props.likeVideo(downLike ? 0 : -1)}
          title={props.video.likes.filter(like => like.value === -1)
            .map(like => like.user.username).join(', ')}
        />
      </div> :
      <div className="vote">
        <div className="number full">{likeCount}</div>
      </div>}
      <div className="img-wrapper">
        <div className="status">{playlistItemStatus}</div>
        <img src={`https://img.youtube.com/vi/${props.video.video.youtubeId}/0.jpg`} alt={props.video.video.title} />
      </div>
      <div className="info">
        <a
          className="title" target="_blank"
          rel="noopener noreferrer"
          title={'Open in YouTube'}
          href={`https://www.youtube.com/watch?v=${props.video.video.youtubeId}`}
        >{props.video.video.title}</a>
        <div className="addedby">
          added by <span className="black">{props.video.user.username}</span>
        </div>
      </div>
      {props.userId ? <div className="delete-column">
        <button className="delete" onClick={() => props.deleteVideo(props.video.id)} />
      </div> : undefined}
    </div>
  );
}

VideoListItem.propTypes = {
  index: PropTypes.number.isRequired,
  userId: PropTypes.number,
  deleteVideo: PropTypes.func.isRequired,
  likeVideo: PropTypes.func.isRequired,
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    video: PropTypes.shape({
      youtubeId: PropTypes.string.isRequired,
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
  userId: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoListItem);
