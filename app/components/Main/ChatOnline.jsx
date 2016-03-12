var React = require('react');

var ChatOnline = React.createClass({
    render: function() {
        return (
            <div className="users">
                <div className="header">
                    <div className="title">Users online</div>
                    <div className="number">0</div>
                </div>
                <div className="body">
                    <div className="user green"></div>
                </div>
            </div>
        );
    }
});

module.exports = ChatOnline;