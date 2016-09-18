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
    updateElapsed(){
      this.setState({
        elapsed: this.state.player.getCurrentTime(),
        total: this.state.player.getDuration()
      });
      setTimeout(this.updateElapsed, 200);
    },
    getInitialState(){
        return {
            elapsed: 0,
            total: 0,
            volume: 100,
            previousVolume: 0,
            paused: false
        }
    },
    pause(){
        this.setState({
            paused: true
        });
        this.state.player.pauseVideo();
    },
    play(){
        this.setState({
            paused: false
        });
        this.state.player.playVideo();
    },
    onSliderChange(value){
        this.setState({
            volume: value
        });
        this.state.player.setVolume(value);
    },
    onSpeakerClick() {
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
    render: function() {
        return (
            <div className="video_player">
                <div className="subtitle">Now playing:</div>
                <div className="title">{this.props.videos[0].title}</div>
                <div className="video-id"></div>
                <div className="player">
                    <div className="overlay"></div>
                    {this.props.videos.length > 0?
                    <YouTube
                        videoId={this.props.videos[0].youtube_id}
                        opts={youtubeParams} onReady={this.onReady} />
                      :false}
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
        );
    }
});

module.exports = VideoPlayer;
