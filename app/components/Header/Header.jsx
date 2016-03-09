import React from 'react';
import UserMenu from './UserMenu';
import HeaderContainer from './HeaderContainer';
import LogOut from './LogOut';
import CreatePlaylist from './CreatePlaylist';
import Login from './Login';
import Register from './Register';
import SearchVideo from './SearchVideo';
import { connect } from 'react-redux';
import { toggleLoginWindow, toggleCreatePlaylistWindow, toggleRegisterWindow, toggleLogoutWindow  } from '../../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        username: state.auth.username,
        loggedIn: state.auth.logged_in,
        loginOpen: state.windows.login_open,
        registerOpen: state.windows.register_open,
        logoutOpen: state.windows.logout_open,
        createPlaylistOpen: state.windows.create_playlist_open
    }
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
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
        }
    }
  }

var Header = ({ loggedIn, registerOpen, loginOpen, logoutOpen, createPlaylistOpen, onOpenLoginClick, onOpenRegisterClick, onOpenCreatePlaylistClick, onOpenLogoutClick, username, search, dispatch }) => {
      if(loggedIn){
          return (
            <HeaderContainer>
                <UserMenu onOpenLogoutClick={onOpenLogoutClick} onOpenCreatePlaylistClick={onOpenCreatePlaylistClick} username={username} loggedIn={loggedIn} search={search}/>
                <LogOut open={logoutOpen}/>
                <CreatePlaylist open={createPlaylistOpen} />
                {search ? <SearchVideo  /> : false}
            </HeaderContainer>
          )
      }
      else{
          return(
              <HeaderContainer onLogoClick="">
                  <UserMenu search={search} onOpenLoginClick={onOpenLoginClick} onOpenRegisterClick={onOpenRegisterClick} username={username} loggedIn={loggedIn} />
                  <Login  open={loginOpen} />
                  <Register open={registerOpen} />
              </HeaderContainer>
          )
      }
}

Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)


module.exports = Header;