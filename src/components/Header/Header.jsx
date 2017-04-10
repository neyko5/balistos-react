import React from 'react';
import UserMenu from './UserMenu';
import HeaderContainer from './HeaderContainer';
import LogOut from './LogOut';
import CreatePlaylist from './CreatePlaylist';
import Login from './Login';
import Register from './Register';
import { connect } from 'react-redux';
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
  verifyToken: React.PropTypes.function.isRequired,
  onOpenLoginClick: React.PropTypes.function.isRequired,
  onOpenRegisterClick: React.PropTypes.function.isRequired,
  onOpenLogoutClick: React.PropTypes.function.isRequired,
  onCreatePlaylistSubmit: React.PropTypes.function.isRequired,
  onLogoutClick: React.PropTypes.function.isRequired,
  createPlaylistOpen: React.PropTypes.function.isRequired,
  logoutOpen: React.PropTypes.function.isRequired,
  registerOpen: React.PropTypes.function.isRequired,
  loginOpen: React.PropTypes.function.isRequired,
  onOpenCreatePlaylistClick: React.PropTypes.function.isRequired,
  loggedIn: React.PropTypes.bool.isRequired,
  username: React.PropTypes.string.isRequired,
  search: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
