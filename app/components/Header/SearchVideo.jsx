var React = require('react');

var SearchVideo = React.createClass({

	render: function() {
		return (
			<div className="search">
                <input type="text" name="search" id="search" placeholder="search video" autoComplete="off" />
                <ul className="results" id="response">
                </ul>
            </div>
		);
	}
});

module.exports = SearchVideo;