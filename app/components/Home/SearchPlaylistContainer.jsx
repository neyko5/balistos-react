import React from 'react';
import SearchPlaylistResults from './SearchPlaylistResults'

var SearchPlaylistContainer = React.createClass({
  render: function() {
    return (    
        <div className="search_playlist">
            <div className="inner">
                <input type="text" id="search_playlist" placeholder="Search playlist" onChange={this.onSearchInputChange} />
                <div className="search_icon"></div>
                <SearchPlaylistResults />
            </div>
        </div>
    )
  },
  onSearchInputChange: function(e) {
    console.log(e.target.value);
  }
});

module.exports = SearchPlaylistContainer;