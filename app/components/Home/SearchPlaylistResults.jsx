import React from 'react';

var SearchPlaylistResults = React.createClass({
  render: function() {
    return (    
        <ul className="results playlist_results" id="response-playlist"></ul>
    )
  }
});

module.exports = SearchPlaylistResults;