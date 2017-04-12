import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import ReactSlider from 'react-slider';
import vTime from 'video-time';
import { youtubeParams } from '../../../settings';

import './VideoPlayer.css';

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
  componentWillMount() {
    youtubeParams.playerVars.start = 0;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.current && this.props.current &&
      prevProps.current.video.youtube_id !== this.props.current.video.youtube_id) {
      youtubeParams.playerVars.start = 0;
      this.resumeVideo();
      this.props.startVideo(this.props.current.id);
      this.props.getRelatedVideos(this.props.current.video.youtube_id);
    }
    if (!prevProps.current && this.props.current) {
      this.props.startVideo(this.props.current.id);
      this.props.getRelatedVideos(this.props.current.video.youtube_id);
      youtubeParams.playerVars.start = this.props.current.started_at;
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onReady(event) {
    this.setState({
      player: event.target,
    });
    setTimeout(this.updateElapsed, 200);
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
      <div className="col-lg-6 col-md-6 col-sm-12 no-gutter">
        <div className="main_window">
          <div className="video_player">
            <div className="player">
              <div className="overlay" />
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="youtube"
                alt="Powered by YouTube"
              >Powered by YouTube</a>
              {this.props.current ?
                <YouTube
                  videoId={this.props.current.video.youtube_id}
                  opts={youtubeParams} onReady={this.onReady} onEnd={this.finishCurrentVideo}
                />
              : <div className="video-empty">
                <div className="text-big">No video</div>
                <div className="text-small">Make sure you add some new videos to the playlist</div>
              </div>
            }
            </div>
            <div className="progress">
              <div className="bar" role="progressbar" style={{ width: `${this.state.elapsed / (this.state.total * 100)}%` }} />
            </div>
            <div className="toolbar">
              <div className="controls">
                {this.state.paused ?
                  <button className="control play" onClick={this.play} /> :
                  <button className="control pause" onClick={this.pause} />}
              </div>
              <div className="timer">
                <div className="elapsed">{vTime(this.state.elapsed)}</div>
                <div className="total"> / {vTime(this.state.total)} </div>
              </div>
              <div className="volume">
                <button className="speaker" onClick={this.onSpeakerClick} />
                <ReactSlider
                  defaultValue={100}
                  value={this.state.volume}
                  onChange={this.onSliderChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  deleteVideo: PropTypes.func.isRequired,
  finishVideo: PropTypes.func.isRequired,
  getRelatedVideos: PropTypes.func.isRequired,
  startVideo: PropTypes.func.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number.isRequired,
    started_at: PropTypes.number.isRequired,
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
  }),
};

VideoPlayer.defaultProps = {
  current: undefined,
};

module.exports = VideoPlayer;
