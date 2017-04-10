import React from 'react';

const UserMenu = (props) => {
  if (props.loggedIn) {
    return (
      <div className="menu">
        <button
          className="menu-button open-create"
          onClick={props.onOpenCreatePlaylistClick}
        >New playlist</button>
        <button className="user" onClick={props.onOpenLogoutClick} >
          <div className="user_icon" />
          <div className="text">Hello</div>
          <div className="username">{props.username}</div>
          <div className="arrow_down" />
        </button>
      </div>
    );
  }

  return (
    <div className="menu">
      <button
        className="menu-button border-left"
        onClick={props.onOpenLoginClick}
      >Log in</button>
      <button
        className="menu-button open-register"
        onClick={props.onOpenRegisterClick}
      >Register</button>
    </div>
  );
};

UserMenu.propTypes = {
  loggedIn: React.PropTypes.boolean.isRequired,
  onOpenLoginClick: React.PropTypes.function.isRequired,
  onOpenRegisterClick: React.PropTypes.function.isRequired,
  onOpenLogoutClick: React.PropTypes.function.isRequired,
  username: React.PropTypes.string.isRequired,
  onOpenCreatePlaylistClick: React.PropTypes.function.isRequired,
};


module.exports = UserMenu;
