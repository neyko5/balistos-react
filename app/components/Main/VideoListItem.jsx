var VideoListItem = React.createClass({
    render: function() {
        return (
            <div className="playlist_item">
                <div className="vote">
                    <div className="up active"></div>
                    <div className="number">245</div>
                    <div className="down"></div>
                </div>
                <img src={"http://img.youtube.com/vi/" + this.props.data.youtube_id + "/0.jpg"}/>
                <div className="info">
                    <div className="title" >{this.props.data.title}</div>
                    <div className="addedby">added by <span className="black"></span></div>
                </div>
                <div className="delete-column">
                    <div className="delete"></div>
                </div>
            </div>
        );
    }
});

module.exports = VideoListItem;
