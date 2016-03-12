import React, { Component, PropTypes } from 'react'
import YouTube from 'react-youtube';
import ReactSlider from 'react-slider';
import { youtubeParams } from '../../settings';

var VideoPlayer =  React.createClass({
    onReady: function(event) {
        this.setState({
            player: event.target
        });
    },
    getInitialState(){
        return {
            videoId: "kszLwBaC4Sw"
        }
    },
    pause(){
        this.state.player.pauseVideo();
    },
    play(){
        this.state.player.playVideo();
    },
    onSliderChange(value){
        this.state.player.setVolume(value);
    },
    onChangeVideo() {
        this.setState({
            videoId: "bvC_0foemLY"
        });
    },
    render: function() {
        return (
            <div className="video_player">
                <div className="subtitle">Now playing:</div>
                <div className="title">Title</div>
                <div className="video-id"></div>
                <div className="player">
                    <div className="overlay"></div>
                    <YouTube
                        videoId={this.state.videoId}
                        opts={youtubeParams} onReady={this.onReady} />
                </div>
                <div className="progress">
                    <div className="bar" role="progressbar"></div>
                </div>
                <div className="toolbar">
                    <div className="controls">
                        <div className="control play" onClick={this.play}></div>
                        <div className="control pause" onClick={this.pause}></div>
                        <div className="control stop" onClick={this.onChangeVideo}></div>
                    </div>
                    <div className="timer">
                        <div className="elapsed"></div>
                        <div className="total"> / </div>
                    </div>
                    <div className="volume">
                        <div className="speaker"></div>
                        <ReactSlider onChange={this.onSliderChange} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = VideoPlayer;