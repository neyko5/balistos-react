import React from 'react';
import YouTube from 'react-youtube';
import ReactSlider from 'react-slider';
import vTime from 'video-time';
import { youtubeParams } from '../../settings';

class VideoPlayer extends React.Component {
  getInitialState() {
    return {
      elapsed: 0,
      total: 0,
      volume: 100,
      previousVolume: 0,
      paused: false,
    };
  }
  componentWillMount() {
    youtubeParams.playerVars.start = 0;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.current && this.props.current &&
      prevProps.current.video.youtube_id !== this.props.current.video.youtube_id) {
      youtubeParams.playerVars.start = 0;
      this.setState({
        paused: false,
      });
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
      <div className="col-lg-7 col-md-6 col-sm-12 no-gutter">
        <div className="main_window">
          <div className="video_player">
            <div className="subtitle">{this.props.current ? 'Now playing:' : 'No video in playlist'}</div>
            {this.props.current ?
              <div className="author">
                added by <span className="black">{this.props.current.user.username}</span>
              </div> : undefined}
            <div className="title">{this.props.current ? this.props.current.video.title : ''}</div>
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
                  <div className="control play" onClick={this.play} /> :
                  <div className="control pause" onClick={this.pause} />}
              </div>
              <div className="timer">
                <div className="elapsed">{vTime(this.state.elapsed)}</div>
                <div className="total"> / {vTime(this.state.total)} </div>
              </div>
              <div className="volume">
                <div className="speaker" click={this.onSpeakerClick} />
                <ReactSlider
                  defaultValue={100}
                  value={this.state.volume}
                  onChange={this.onSliderChange}
                />
              </div>
            </div>
          </div>
          <div className="button_menu">
            {this.props.current ? <span className="voting">
              <div
                className="voted up"
                title={this.props.current.likes
                  .filter(like => like.value === 1).map(like => like.user.username).join(', ')}
              >{this.props.current.likes.filter(like => like.value === 1).length}</div>
              <div
                className="voted down"
                title={this.props.current.likes
                  .filter(like => like.value === -1).map(like => like.user.username).join(', ')}
              >{this.props.current.likes.filter(like => like.value === -1).length}</div>
            </span> : null}
            {this.props.username ?
              <div className="button grey delete" click={this.deleteCurrentVideo}>
                <i className="icon delete" /> Delete video
              </div> : null}
          </div>
        </div>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  username: React.propTypes.string.isRequired,
  deleteVideo: React.PropTypes.function.isRequired,
  finishVideo: React.PropTypes.function.isRequired,
  getRelatedVideos: React.PropTypes.function.isRequired,
  startVideo: React.PropTypes.function.isRequired,
  current: React.PropTypes.shape({
    id: React.PropTypes.shape({
      videoId: React.propTypes.string.isRequired,
    }).isRequired,
    started_at: React.propTypes.string.isRequired,
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

module.exports = VideoPlayer;
