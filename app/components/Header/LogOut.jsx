import React from 'react';

var LogOut = React.createClass({
  render: function() {
    return (	
		<div className="dropdown hidden small" id="logout" >
            <a href="/logout" className="button green logout">Log Out</a>
        </div>
    );
  }
});

module.exports = LogOut;