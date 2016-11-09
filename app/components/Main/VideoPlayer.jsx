import React, { Component, PropTypes } from 'react'
import YouTube from 'react-youtube';
import ReactSlider from 'react-slider';
import { youtubeParams } from '../../settings';
import vTime from 'video-time';

var VideoPlayer =  React.createClass({
    componentWillMount: function(){
        youtubeParams.playerVars.start = 0;
    },
    onReady: function(event) {
        this.setState({
            player: event.target,
        });
        setTimeout(this.updateElapsed, 200);
    },
    updateElapsed: function(){
      this.setState({
        elapsed: this.state.player.getCurrentTime(),
        total: this.state.player.getDuration()
      });
      this.timeout = setTimeout(this.updateElapsed, 200);
    },
    getInitialState: function(){
        return {
            elapsed: 0,
            total: 0,
            volume: 100,
            previousVolume: 0,
            paused: false
        }
    },
    componentDidUpdate(prevProps) {
        if(prevProps.current && this.props.current && prevProps.current.video.youtube_id !== this.props.current.video.youtube_id){
            this.setState({
                paused: false
            });
        }
    },
    pause: function(){
        this.setState({
            paused: true
        });
        this.state.player.pauseVideo();
    },
    play: function(){
        this.setState({
            paused: false
        });
        this.state.player.playVideo();
    },
    finishCurrentVideo: function() {
        this.props.finishVideo(this.props.current.id);
    },
    deleteCurrentVideo: function() {
        this.props.deleteVideo(this.props.current.id);
    },
    onSliderChange: function(value){
        this.setState({
            volume: value
        });
        this.state.player.setVolume(value);
    },
    onSpeakerClick: function() {
        if(this.state.volume == 0){
          this.setState({
            volume: this.state.previousVolume,
            previousVolume: 0
          });
          this.state.player.setVolume(this.state.previousVolume);
        }
        else {
          this.setState({
            volume: 0,
            previousVolume: this.state.volume
          });
          this.state.player.setVolume(0);
        }
    },
    componentWillUnmount(){
      clearTimeout(this.timeout);
    },
    render: function() {
        return (
            <div className="col-lg-7 col-md-6 col-sm-12 no-gutter">
                <div className="main_window">
                    <div className="video_player">
                        <div className="subtitle">{this.props.current?"Now playing:":"No video in playlist"}</div>
                        {this.props.current?<div className="author">added by <span className="black">{this.props.current.user.username}</span></div>:null}
                        <div className="title">{this.props.current?this.props.current.video.title:""}</div>
                        <div className="player">
                            <div className="overlay"></div>
                            {this.props.current?
                            <YouTube
                                videoId={this.props.current.video.youtube_id}
                                opts={youtubeParams} onReady={this.onReady} onEnd={this.finishCurrentVideo}  />
                                :<div className="video-empty"> 
                                    <div className="text-big">No video</div> 
                                    <div className="text-small">Make sure you add some new videos to the playlist</div> 
                                </div>
                            } 
                        </div>
                        <div className="progress">
                            <div className="bar" role="progressbar" style={{width: this.state.elapsed/this.state.total*100 + "%"}}></div>
                        </div>
                        <div className="toolbar">
                            <div className="controls">
                                {this.state.paused?
                                <div className="control play" onClick={this.play}></div>:
                                <div className="control pause" onClick={this.pause}></div>}
                            </div>
                            <div className="timer">
                                <div className="elapsed">{vTime(this.state.elapsed)}</div>
                                <div className="total"> / {vTime(this.state.total)} </div>
                            </div>
                            <div className="volume">
                                <div className="speaker" onClick={this.onSpeakerClick}></div>
                                <ReactSlider defaultValue={100} value={this.state.volume} onChange={this.onSliderChange} />
                            </div>
                        </div>
                    </div>
                    <div className="button_menu">
                        {this.props.current?<span className="voting">
                            <div className="voted up" title={this.props.current.likes.filter(like => like.value === 1).map(like => like.user.username).join(', ')}>{this.props.current.likes.filter((like) => like.value === 1).length}</div>
                            <div className="voted down" title={this.props.current.likes.filter(like => like.value === -1).map(like => like.user.username).join(', ')}>{this.props.current.likes.filter((like) => like.value === -1).length}</div>
                        </span>:null}
                        {this.props.username?<div className="button grey delete" onClick={this.deleteCurrentVideo}>
                            <i className="icon delete"></i>
                            Delete video
                        </div>:null}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = VideoPlayer;
