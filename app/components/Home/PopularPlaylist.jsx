var React = require('react');

var PopularPlaylist = React.createClass({
    render: function() {
        return (
            <a href="/playlist/uri" className="play-list">
                <div className="number" >{this.props.data.number}</div>
                <div className="square">
                    <div className="title">{this.props.data.title}</div>
                    <div className="created">created by <span className="black">{this.props.data.creator}</span></div>
                </div>
            </a>
        );
    }
});

module.exports = PopularPlaylist;