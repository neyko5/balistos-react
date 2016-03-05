import React from 'react';

var Header = React.createClass({
  render: function() {
    return (    
        <div className="menu">
            <div onClick={this.props.onLoginClick} className="menu-button border-left open-login">Log in</div>
            <div className="menu-button open-register">Register</div>
            <div className="menu-button open-create" >New playlist</div>
            <div className="user" >
                <img src={require("../../img/user.png")} />
                <div className="text">Hello</div>
                <div className="username">Username</div>
                <div className="arrow_down"></div>
            </div>
        </div>
    )
  }
});

module.exports = Header;