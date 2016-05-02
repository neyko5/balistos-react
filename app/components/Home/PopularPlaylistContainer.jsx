var React = require('react');
var PopularPlaylist = require('./PopularPlaylist');

var PopularPlaylistContainer = React.createClass({
    render: function() {
        var playlists = [
            {uri: "number1", number: 1, title: "Top notch", creator: "Ulverbite" },
            {uri: "number2", number: 2, title: "Top notch2", creator: "Ulverbite2" }
        ];
        return (
            <div className="col-lg-6 col-md-6" >
                {playlists.map(function(result) {
                  return <PopularPlaylist data={result} key={result.number}/>;
                })}
            </div>
        );
    }
});

module.exports = PopularPlaylistContainer;
