import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import VideoListContainer from '../VideoListContainer';
import VideoPlayer from '../VideoPlayer';
import ChatContainer from '../ChatContainer';
import RelatedVideos from '../RelatedVideos';
import {
  fetchPlaylist,
  sendHeartbeat,
  finishVideo,
  deleteVideo,
  getActiveUsers,
  startVideo,
  getRelatedVideos,
  closeAllWindows,
  addVideo,
} from '../../../actions';

import { API_INDEX } from '../../../settings';

const socket = io(API_INDEX);

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  playlist: state.playlist,
  username: state.auth.username,
  related: state.results.related
});

const mapDispatchToProps = dispatch => ({
  fetchVideos: (id) => {
    dispatch(fetchPlaylist(id));
  },
  socketAction: (action) => {
    dispatch(action);
  },
  heartbeat: (username, playlist) => {
    dispatch(sendHeartbeat(username, playlist));
  },
  getActiveUsers: (playlist) => {
    dispatch(getActiveUsers(playlist));
  },
  finishVideo: (videoId) => {
    dispatch(finishVideo(videoId));
  },
  deleteVideo: (videoId) => {
    dispatch(deleteVideo(videoId));
  },
  startVideo: (videoId) => {
    dispatch(startVideo(videoId));
  },
  getRelatedVideos: (videoId) => {
    dispatch(getRelatedVideos(videoId));
  },
  addVideo: (youtubeId, title, playlistId) => {
    dispatch(addVideo(youtubeId, title, playlistId));
  },
  closeAllWindows: () => {
    dispatch(closeAllWindows());
  },
});

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.heartbeat = this.heartbeat.bind(this);
  }
  componentDidMount() {
    this.initPlaylist();
    socket.on('action', (action) => {
      this.props.socketAction(action);
    });
    Notification.requestPermission();
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.playlistId !== prevProps.match.params.playlistId) {
      socket.emit('leave', `playlist_${prevProps.match.params.playlistId}`);
      this.initPlaylist();
    }
    if (prevProps.playlist.current && !this.props.playlist.current && this.props.related.length) {
       let related = this.props.related[0];
       this.props.addVideo(related.id.videoId, related.snippet.title, this.props.playlist.id);
    }
  }
  componentWillUnmount() {
    socket.emit('leave', `playlist_${this.props.match.params.playlistId}`);
  }
  initPlaylist() {
    this.props.fetchVideos(this.props.match.params.playlistId);
    socket.emit('join', `playlist_${this.props.match.params.playlistId}`);
    this.heartbeat();
  }
  heartbeat() {
    if (this.props.username) {
      this.props.heartbeat(this.props.username, this.props.match.params.playlistId);
    } else {
      this.props.getActiveUsers(this.props.match.params.playlistId);
    }
    setTimeout(this.heartbeat, 60000);
  }
  render() {
    return (
      <main onClick={this.props.closeAllWindows}>
        <div className="container">
          <VideoPlayer
            current={this.props.playlist.current}
            username={this.props.username}
            getRelatedVideos={this.props.getRelatedVideos}
            finishVideo={this.props.finishVideo} startVideo={this.props.startVideo}
            deleteVideo={this.props.deleteVideo}
          />
          <div className="sidebar col-lg-6 col-md-6 col-sm-12 col-xs-12 left-gutter">
            <VideoListContainer playlist={this.props.playlist} />
            <RelatedVideos />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 no-gutter">
            <ChatContainer
              playlist={this.props.playlist}
              id={this.props.match.params.playlistId}
            />
          </div>
        </div>
      </main>
    );
  }
}

Playlist.propTypes = {
  username: PropTypes.string,
  socketAction: PropTypes.func.isRequired,
  fetchVideos: PropTypes.func.isRequired,
  deleteVideo: PropTypes.func.isRequired,
  finishVideo: PropTypes.func.isRequired,
  startVideo: PropTypes.func.isRequired,
  heartbeat: PropTypes.func.isRequired,
  getActiveUsers: PropTypes.func.isRequired,
  getRelatedVideos: PropTypes.func.isRequired,
  playlist: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      playlistId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

Playlist.defaultProps = {
  playlist: {
    current: undefined,
  },
  username: undefined,
};


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
