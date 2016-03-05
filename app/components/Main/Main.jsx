import React from 'react';
import Header from '../Header/Header';

var Main = React.createClass({
  render: function() {
    return (
        <div className="full-height"> 
            <Header search={true} />
            <main>
                <div className="container">
                    <div className="col-lg-7 col-md-6 col-sm-12 no-gutter">
                        <div className="main_window">
                            <div className="video_player">
                                <div className="subtitle">Now playing:</div>
                                <div className="title"></div>
                                <div className="video-id"></div>
                                <div className="video-id"></div>
                                <div className="player">
                                    <div className="overlay"></div>
                                    <div id="player"></div>
                                </div>
                                <div className="progress">
                                    <div className="bar" role="progressbar"></div>
                                </div>
                                <div className="toolbar">
                                    <div className="controls">
                                        <div className="control play"></div>
                                        <div className="control pause"></div>
                                        <div className="control stop"></div>
                                    </div>
                                    <div className="timer">
                                        <div className="elapsed"></div>
                                        <div className="total"> / </div>
                                    </div>
                                    <div className="volume">
                                        <div className="speaker"></div>
                                        <input type="hidden" id="volume-slider" value="100" />
                                    </div>
                                </div>
                            </div>
                            <div className="button_menu">
                                <div className="button grey delete">
                                    <i className="icon delete"></i>
                                    Delete video
                                </div>
                                <div className="button red hide" id="hide-player">
                                    <i className="icon hide"></i>
                                    Hide player
                                </div>
                                 <div className="button green show" id="show-player">
                                    <i className="icon show"></i>
                                    Show player
                                </div>
                                <div className="share-row">
                                    <div className="share-left"></div>
                                    <div className="share-icon facebook"></div>
                                    <div className="share-icon twitter"></div>
                                    <div className="share-icon google"></div>
                                    <div className="share-icon email"></div>
                                    <div className="share-right"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar col-lg-5 col-md-6 col-sm-7 col-xs-12 left-gutter">
                        <div className="box first">
                            <div className="header">
                                <i className="icon note"></i>
                                <div className="title"></div>
                            </div>
                            <div className="body">
                               <div>
                                    <div>
                                        <div className="playlist_item">
                                            <div className="vote">
                                                <div className="up active"></div>
                                                <div className="number">245</div>
                                                <div className="down"></div>
                                            </div>
                                            <img/>
                                            <div className="info">
                                                <div className="title" ></div>
                                                <div className="addedby">added by <span className="black"></span></div>
                                            </div>
                                            <div className="delete-column">
                                                <div className="delete"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="empty_item">Playlist is empty. Please search and add a video.</div>
                            </div>
                        </div>
                    </div>
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