import React from 'react';

var CreatePlaylist = React.createClass({
    render: function() {
        return (    
            <div className={"dropdown " + (this.props.open ? '':'hidden')} id="create"  >
                <form action="/create_playlist" method="POST" id="create_playlist">
                    <label>
                        <div className="title">Title</div>
                        <div className="error" id="create-playlist-error"></div>
                        <input type="text" id="playlist-title" name="playlist-title" />
                    </label>
                    <button type="submit" className="button green">Create</button>
                </form>
            </div>
        );
    }
});

module.exports = CreatePlaylist;