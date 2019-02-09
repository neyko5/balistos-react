import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

import VideoListContainer from './VideoListContainer';
import VideoPlayer from './VideoPlayer';
import ChatContainer from './ChatContainer';
import RelatedVideos from './RelatedVideos';
import Container from '../common/Container';
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

import { API_INDEX } from '../../settings';
import { YoutubeResultVideoType, PlaylistType, Action } from '../../types/index';
import { Dispatch } from 'redux';

const socket = io(API_INDEX);

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps,
  playlist: state.playlist,
  username: state.auth.username,
  related: state.results.related,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchVideos: (id: string) => {
    dispatch(fetchPlaylist(id));
  },
  socketAction: (action: Action) => {
    dispatch(action);
  },
  heartbeat: (username: string, playlist: string) => {
    dispatch(sendHeartbeat(username, playlist));
  },
  getActiveUsers: (playlist: string) => {
    dispatch(getActiveUsers(playlist));
  },
  finishVideo: (videoId: number) => {
    dispatch(finishVideo(videoId));
  },
  deleteVideo: (videoId: number) => {
    dispatch(deleteVideo(videoId));
  },
  startVideo: (videoId: number) => {
    dispatch(startVideo(videoId));
  },
  getRelatedVideos: (youtubeVideoId: string) => {
    dispatch(getRelatedVideos(youtubeVideoId));
  },
  addVideo: (youtubeId: string, title: string, playlistId: string) => {
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
  socketAction: (action: Action) => void,
  addVideo: (youtubeId: string, title: string, playlistId: number) => void,
  fetchVideos: (playlistId: string) => void,
  deleteVideo: (videoId: number) => void,
  finishVideo: (videoId: number) => void,
  startVideo: (videoId: number) => void,
  heartbeat: (username: string, playlist: string) => void,
  getActiveUsers: (playlist: string) => void,
  getRelatedVideos: (youtubeVideoId: string) => void,
  closeAllWindows: () => void,
  username: string,
  playlist: PlaylistType,
  match: any,
  related: YoutubeResultVideoType[],
}

type State = {}

class Playlist extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.heartbeat = this.heartbeat.bind(this);
  }

  componentDidMount() {
    this.initPlaylist();
    socket.on('action', (action: Action) => {
      this.props.socketAction(action);
    });
    (window as any).Notification.requestPermission();
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
          <Flex flexWrap={'wrap'}>
            <VideoPlayer
              playlistTitle={this.props.playlist.title}
              playlistUsername={this.props.playlist.username}
              current={this.props.playlist.current}
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
