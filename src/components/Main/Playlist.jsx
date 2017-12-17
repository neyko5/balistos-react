// @flow

import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

import VideoListContainer from './VideoListContainer';
import VideoPlayer from './VideoPlayer';
import ChatContainer from './ChatContainer';
import RelatedVideos from './RelatedVideos';
import Container from '.././common/Container';
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
} from '../../actions';

import type { Action } from '../../types';

import { API_INDEX } from '../../settings';

const socket = io(API_INDEX);

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  playlist: state.playlist,
  username: state.auth.username,
  related: state.results.related,
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
    dispatch(addVideo(youtubeId, title, playlistId, true));
  },
  closeAllWindows: () => {
    dispatch(closeAllWindows());
  },
});

const Main = styled.div`
  min-height: 100%;
  height: auto;
  margin: -50px auto -45px;
  padding: 50px 0 45px;
  @media (min-width: 992px)
  {
      margin-top: 0;
  }
`;

type Props = {
  socketAction: (Action) => void,
  addVideo: (string, string, string) => void,
  fetchVideos: (string) => void,
  deleteVideo: (string) => void,
  finishVideo: (string) => void,
  startVideo: (string) => void,
  heartbeat: (string, string) => void,
  getActiveUsers: (string) => void,
  getRelatedVideos: (string) => void,
  closeAllWindows: () => void,
  username: string,
  playlist: any,
  match: any,
  related: any,
}

type State = {}

class Playlist extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.heartbeat = this.heartbeat.bind(this);
  }

  componentDidMount() {
    this.initPlaylist();
    socket.on('action', (action) => {
      this.props.socketAction(action);
    });
    window.Notification.requestPermission();
  }
  componentDidUpdate(prevProps: Props) {
    if (this.props.match.params.playlistId !== prevProps.match.params.playlistId) {
      socket.emit('leave', `playlist_${prevProps.match.params.playlistId}`);
      this.initPlaylist();
    }
    if (prevProps.playlist.current && !this.props.playlist.current && this.props.related.length) {
      const related = this.props.related[0];
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

  heartbeat: Function;
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
      <Main onClick={this.props.closeAllWindows}>
        <Container>
          <Flex wrap>
            <VideoPlayer
              playlistTitle={this.props.playlist.title}
              playlistUsername={this.props.playlist.username}
              current={this.props.playlist.current}
              username={this.props.username}
              getRelatedVideos={this.props.getRelatedVideos}
              finishVideo={this.props.finishVideo}
              startVideo={this.props.startVideo}
              deleteVideo={this.props.deleteVideo}
            />
            <VideoListContainer playlist={this.props.playlist} />
            <ChatContainer
              playlist={this.props.playlist}
              id={this.props.match.params.playlistId}
            />
            <RelatedVideos />
          </Flex>
        </Container>
      </Main>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
