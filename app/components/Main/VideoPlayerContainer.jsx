var VideoPlayer = require('./VideoPlayer');
var VideoControls = require('./VideoControls');

var VideoPlayerContainer = React.createClass({
    render: function() {
        return (
            <div className="col-lg-7 col-md-6 col-sm-12 no-gutter">
                <div className="main_window">
                    <VideoPlayer videos={this.props.videos} />
                    <VideoControls />
                </div>
            </div>
        );
    }
});

module.exports = VideoPlayerContainer;
