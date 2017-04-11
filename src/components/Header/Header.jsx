import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserMenu from './UserMenu';
import HeaderContainer from './HeaderContainer';
import LogOut from './LogOut';
import CreatePlaylist from './CreatePlaylist';
import Login from './Login';
import Register from './Register';

import { toggleLoginWindow, toggleCreatePlaylistWindow, toggleRegisterWindow, toggleLogoutWindow, logOut, createPlaylist, verifyToken } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  username: state.auth.username,
  loggedIn: state.auth.logged_in,
  loginOpen: state.windows.login_open,
  registerOpen: state.windows.register_open,
  logoutOpen: state.windows.logout_open,
  createPlaylistOpen: state.windows.create_playlist_open,
});

const mapDispatchToProps = dispatch => ({
  verifyToken: () => {
    dispatch(verifyToken());
  },
  onOpenLoginClick: () => {
    dispatch(toggleLoginWindow());
  },
  onOpenRegisterClick: () => {
    dispatch(toggleRegisterWindow());
  },
  onOpenLogoutClick: () => {
    dispatch(toggleLogoutWindow());
  },
  onOpenCreatePlaylistClick: () => {
    dispatch(toggleCreatePlaylistWindow());
  },
  onLogoutClick: () => {
    dispatch(logOut());
  },
  onCreatePlaylistSubmit: (title, description) => {
    dispatch(createPlaylist(title, description));
  },
});

class Header extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.verifyToken();
    }
  }
  render() {
    if (this.props.loggedIn) {
      return (
        <HeaderContainer>
          <UserMenu
            onOpenLogoutClick={this.props.onOpenLogoutClick}
            onOpenCreatePlaylistClick={this.props.onOpenCreatePlaylistClick}
            username={this.props.username}
            loggedIn={this.props.loggedIn}
            search={this.props.search}
          />
          <LogOut
            open={this.props.logoutOpen}
            onLogoutClick={this.props.onLogoutClick}
          />
          <CreatePlaylist
            open={this.props.createPlaylistOpen}
            onCreatePlaylistSubmit={this.props.onCreatePlaylistSubmit}
          />
        </HeaderContainer>
      );
    }
    return (
      <HeaderContainer>
        <UserMenu
          search={this.props.search}
          onOpenLoginClick={this.props.onOpenLoginClick}
          onOpenRegisterClick={this.props.onOpenRegisterClick}
          username={this.props.username}
          loggedIn={this.props.loggedIn}
        />
        <Login
          open={this.props.loginOpen}
        />
        <Register
          open={this.props.registerOpen}
        />
      </HeaderContainer>
    );
  }
}

Header.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  onOpenLoginClick: PropTypes.func.isRequired,
  onOpenRegisterClick: PropTypes.func.isRequired,
  onOpenLogoutClick: PropTypes.func.isRequired,
  onCreatePlaylistSubmit: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  createPlaylistOpen: PropTypes.bool,
  logoutOpen: PropTypes.bool.isRequired,
  registerOpen: PropTypes.bool,
  loginOpen: PropTypes.bool,
  onOpenCreatePlaylistClick: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  username: PropTypes.string,
  search: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  registerOpen: false,
  username: undefined,
  loggedIn: false,
  createPlaylistOpen: false,
  logoutOpen: false,
  loginOpen: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
