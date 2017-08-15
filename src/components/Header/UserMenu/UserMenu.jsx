import React from 'react';
import PropTypes from 'prop-types';

const UserMenu = (props) => {
  return (
    props.loggedIn ?
      <div className="menu" onClick={(event) => event.stopPropagation()}>
        <button
          className="menu-button open-create"
          onClick={props.onOpenCreatePlaylistClick}
        >New playlist</button>
        <button className="user" onClick={props.onOpenLogoutClick} >
          <div className="user_icon" />
          <div className="text hidden-xs">Hello</div>
          <div className="username">{props.username}</div>
          <div className="arrow_down" />
        </button>
      </div> :
      <div className="menu" onClick={(event) => event.stopPropagation()}>
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
  loggedIn: PropTypes.bool.isRequired,
  onOpenLoginClick: PropTypes.func,
  onOpenRegisterClick: PropTypes.func,
  onOpenLogoutClick: PropTypes.func,
  username: PropTypes.string,
  onOpenCreatePlaylistClick: PropTypes.func,
};

UserMenu.defaultProps = {
  onOpenLoginClick: undefined,
  onOpenRegisterClick: undefined,
  onOpenLogoutClick: undefined,
  username: undefined,
  onOpenCreatePlaylistClick: undefined,
};


export default UserMenu;
