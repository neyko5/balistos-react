var React = require('react');

var ShareIcons = React.createClass({
    render: function() {
        return (
            <div className="share-row">
                <div className="share-left"></div>
                <div className="share-icon facebook"></div>
                <div className="share-icon twitter"></div>
                <div className="share-icon google"></div>
                <div className="share-icon email"></div>
                <div className="share-right"></div>
            </div>
        );
    }
});

module.exports = ShareIcons;