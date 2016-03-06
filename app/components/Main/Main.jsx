import React from 'react';
import Header from '../Header/Header';
import VideoListContainer from './VideoListContainer';
import VideoPlayer from './VideoListContainer';
import axios from 'axios';

var Main = React.createClass({
      getVideos: function(){
            return axios.get('http://localhost/').then(function(videos){
                return videos.data;
        });
      },  
    getInitialState: function() {
        return {
            videos: []
        };
    },
    componentDidMount: function(){
        this.getVideos().then(function(videos){
            this.setState({
                videos: videos
            });
        }.bind(this)); 
    },
    getFirstVideo: function(){
        if(this.state.videos){
            return {
                id: null,
                title: "Loading..."
            }
        }
        else{
            return this.state.videos[0];
        }
    },
    render: function() {
        return (
            <div className="full-height"> 
                <Header search={true} />
                <main>
                    <div className="container">
                        <VideoPlayer video={this.getFirstVideo} />
                        <VideoListContainer videos={this.state.videos}/>
                        <div className="right-sidebar col-lg-5 col-md-6 col-sm-5 col-xs-12 left-gutter middle-gutter">
                            <div className="users">
                                <div className="header">
                                    <div className="title">Users online</div>
                                    <div className="number">0</div>
                                </div>
                                <div className="body">
                                    <div className="user green"></div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="header">
                                    <i className="icon chat"></i>
                                    <div className="title">Chat with your buddies</div>
                                </div>
                                <div className="chatbox">
                                    <div className="message">
                                        <span className="author red"></span>: <span></span>
                                    </div>
                                </div>
                                <div className="send">
                                    <form id="chat-form" role="form">
                                        <textarea name="message" placeholder="Send a message"></textarea>
                                        <button type="submit" className="button green chat">
                                            <i className="icon message"></i>
                                            Chat
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
});    

module.exports = Main;