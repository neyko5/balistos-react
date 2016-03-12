var React = require('react');
var ShareIcons = require('./ShareIcons');

var VideoControls = React.createClass({
    render: function() {
        return (
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
                <ShareIcons />
            </div>
        );
    }
});

module.exports = VideoControls;