import React from 'react';

var LogOut = React.createClass({
  render: function() {
    return (	
		<div className={"dropdown small " + (this.props.show ? '':'hidden')} id="logout" >
            <a href="/logout" className="button green logout">Log Out</a>
        </div>
    );
  }
});

module.exports = LogOut;