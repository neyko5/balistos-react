import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import ReactSlider from 'react-slider';
import vTime from 'video-time';
import styled, { css } from 'styled-components';
import { Box } from 'grid-styled';

import { youtubeParams } from '../../settings';
import playIcon from '../../img/play.png';
import pauseIcon from '../../img/pause.png';
import speakerIcon from '../../img/volume.png';

const MainWindow = styled.div`
  background: #ffffff;
  float: left;
  width: 100%;
  margin: 25px 0 0;
`;

const Video = styled.div`
  width: 100%;
  iframe {
    width: 100%;
    height: 410px;
    display: block;
  }
`;

const Player = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 0;
  cursor: default;
  &:hover {
    opacity: 0.1;
  }
`;

const VideoEmpty = styled.div`
  height: 400px;
  padding-top: 160px;
  background-color: #000000;
  text-align: center;
  vertical-align: middle;
`;
const EmptyTextBig = styled.div`
  font-size: 24px;
  color: #DCDCDC;
`;

const EmptyTextSmall = styled.div`
  font-size: 16px;
  color: #666666;
`;

const Progress = styled.div`
  width: 100%;
  height: 5px;
  background: #dcdcdc;
  float: left;
`;

const Bar = styled.div`
  width: ${props => props.width || 0}%;
  background: #d96459;
  height: 5px;
  max-width: 100%;
`;

const Toolbar = styled.div`
  width: 100%;
  height: 35px;
  float: left;
  background: #4d4c4c;
  padding: 7px 10px;
`;

const Controls = styled.div`
  float: left;
`;

const ControlButton = styled.button`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 5px;
  float: left;
  ${props => props.pause && css`
    background: url(${pauseIcon}) no-repeat 50%;
  `}
  ${props => props.play && css`
    background: url(${playIcon}) no-repeat 50%;
  `}
`;

const Timer = styled.div`
  float: left;
  margin-left: 20px;
`;

const Time = styled.div`
  font-weight: 600;
  line-height: 22px;
  color: #fff;
  font-size: 12px;
  float: left;
  ${props => props.total && css`
    margin-left: 6px;
    color: #999;
  `}
`;

const Volume = styled.div`
  float: right;
  .slider {
    width: 64px;
    margin-top: 9px;
    height: 5px;
    float: left;
    background: #dcdcdc;
    cursor: pointer;
    .handle {
      width: 5px;
      height: 13px;
      top: -4px;
      left: 40%;
      background: #fff;
      position: absolute;
    }
  }
`;

const Speaker = styled.button`
  width: 16px;
  height: 22px;
  background: url(${speakerIcon}) 50% no-repeat;
  float: left;
  margin-right: 10px;
  cursor: pointer;
`;
const PlaylistHeader = styled.div`
  float: left;
  padding-right: 10px;
  width: 100%;
  height: 40px;
  line-height: 46px;
  border-bottom: 1px solid #e1e1e1;
  font-size: 14px;
  font-style: italic;
`;

const PlaylistTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
`;

const Created = styled.span`

`;

const PlaylistUsername = styled.span`
  font-style: italic;
`;


class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0,
      total: 0,
      volume: 100,
      previousVolume: 0,
      paused: false,
    };
    this.onReady = this.onReady.bind(this);
    this.onSpeakerClick = this.onSpeakerClick.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.resumeVideo = this.resumeVideo.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.updateElapsed = this.updateElapsed.bind(this);
    this.finishCurrentVideo = this.finishCurrentVideo.bind(this);
    this.deleteCurrentVideo = this.deleteCurrentVideo.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.current && this.props.current &&
      prevProps.current.video.youtubeId !== this.props.current.video.youtubeId) {
      if (this.state.player) {
        this.state.player.seekTo(0);
      }
      this.resumeVideo(this.props.current.video.youtubeId);
      this.props.startVideo(this.props.current.id);
      this.props.getRelatedVideos(this.props.current.video.youtubeId);
    }
    if (!prevProps.current && this.props.current) {
      this.props.startVideo(this.props.current.id);
      this.props.getRelatedVideos(this.props.current.video.youtubeId);
      if (this.state.player) {
        this.state.player.seekTo(this.props.current.startedAt);
      }
    }
    if (this.props.current && (!prevProps.current ||
      prevProps.current.video.youtubeId !== this.props.current.video.youtubeId)) {
      const options = {
        body: this.props.current.video.title,
        icon: `https://img.youtube.com/vi/${this.props.current.video.youtubeId}/0.jpg`,
        tag: 'video',
        requireInteraction: false,
      };
      new window.Notification(`Balistos - ${this.props.playlistTitle}`, options);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onReady(event) {
    this.setState({
      player: event.target,
    });
    setTimeout(this.updateElapsed, 500);
  }
  onSpeakerClick() {
    if (this.state.volume === 0) {
      this.setState({
        volume: this.state.previousVolume,
        previousVolume: 0,
      });
      this.state.player.setVolume(this.state.previousVolume);
    } else {
      this.setState({
        volume: 0,
        previousVolume: this.state.volume,
      });
      this.state.player.setVolume(0);
    }
  }
  onSliderChange(value) {
    this.setState({
      volume: value,
    });
    this.state.player.setVolume(value);
  }
  resumeVideo() {
    this.setState({
      paused: false,
    });
  }
  finishCurrentVideo() {
    this.props.finishVideo(this.props.current.id);
  }
  deleteCurrentVideo() {
    this.props.deleteVideo(this.props.current.id);
  }
  play() {
    this.setState({
      paused: false,
    });
    this.state.player.playVideo();
  }
  pause() {
    this.setState({
      paused: true,
    });
    this.state.player.pauseVideo();
  }
  updateElapsed() {
    this.setState({
      elapsed: this.state.player.getCurrentTime(),
      total: this.state.player.getDuration(),
    });
    this.timeout = setTimeout(this.updateElapsed, 500);
  }

  render() {
    return (
      <Box width={[1, 1, 1 / 2, 1 / 2]}>
        <MainWindow>
          <Video>
            <Player>
              <Overlay />
              {this.props.current ?
                <YouTube
                  videoId={this.props.current.video.youtubeId}
                  opts={youtubeParams}
                  onReady={this.onReady}
                  onEnd={this.finishCurrentVideo}
                />
                :
                <VideoEmpty>
                  <EmptyTextBig>No video</EmptyTextBig>
                  <EmptyTextSmall>Make sure you add some new videos to the playlist</EmptyTextSmall>
                </VideoEmpty>
              }
            </Player>
            <Progress>
              <Bar width={this.state.total ? (this.state.elapsed / (this.state.total) * 100) : 0} />
            </Progress>
            <Toolbar>
              <Controls>
                {this.state.paused ?
                  <ControlButton play onClick={this.play} /> :
                  <ControlButton pause onClick={this.pause} />}
              </Controls>
              <Timer>
                <Time>{vTime(this.state.elapsed)}</Time>
                <Time total> / {vTime(this.state.total)} </Time>
              </Timer>
              <Volume>
                <Speaker className="speaker" onClick={this.onSpeakerClick} />
                <ReactSlider
                  defaultValue={100}
                  value={this.state.volume}
                  onChange={this.onSliderChange}
                />
              </Volume>
            </Toolbar>
          </Video>
        </MainWindow>
        <PlaylistHeader>
          <PlaylistTitle>{this.props.playlistTitle}</PlaylistTitle>
          <Created> created by </Created>
          <PlaylistUsername>{this.props.playlistUsername}</PlaylistUsername>
        </PlaylistHeader>
      </Box>
    );
  }
}

VideoPlayer.propTypes = {
  playlistTitle: PropTypes.string,
  playlistUsername: PropTypes.string.isRequired,
  deleteVideo: PropTypes.func.isRequired,
  finishVideo: PropTypes.func.isRequired,
  getRelatedVideos: PropTypes.func.isRequired,
  startVideo: PropTypes.func.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number.isRequired,
    startedAt: PropTypes.number,
    video: PropTypes.shape({
      youtubeId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number,
    })).isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

VideoPlayer.defaultProps = {
  current: undefined,
  playlistTitle: '',
};

export default VideoPlayer;
