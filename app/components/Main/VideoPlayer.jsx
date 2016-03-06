var React = require('react');

var VideoPlayer = React.createClass({
    render: function() {
        return (
            <div className="col-lg-7 col-md-6 col-sm-12 no-gutter">
                <div className="main_window">
                    <div className="video_player">
                        <div className="subtitle">Now playing:</div>
                        <div className="title">{this.props.video.title}</div>
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
        );
    }

});

module.exports = VideoPlayer;