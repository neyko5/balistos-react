import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import UserMenu from '../UserMenu';
import LogOut from '../LogOut';
import CreatePlaylist from '../CreatePlaylist';
import Login from '../Login';
import Register from '../Register';
import Container from '../../common/Container';

import logoImage from '../../../img/logo.png';

import {
  toggleLoginWindow,
  toggleCreatePlaylistWindow,
  toggleRegisterWindow,
  toggleLogoutWindow,
  logOut,
  createPlaylist,
  verifyToken,
} from '../../../actions';

import './Header.css';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  username: state.auth.username,
  loggedIn: state.auth.loggedIn,
  loginOpen: state.windows.loginOpen,
  registerOpen: state.windows.registerOpen,
  logoutOpen: state.windows.logoutOpen,
  createPlaylistOpen: state.windows.createPlaylistOpen,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
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
    dispatch(createPlaylist(title, description, ownProps.history));
  },
});

const HeaderContainer = styled.header `
  height: 50px;
  width: 100%;
  background-color: #212121;
  border-bottom: 1px solid #666666;
  @media (min-width: 1280px) {
      position: fixed;
      top: 0;
      z-index: 30;
  }
  @media (max-width: 1279px) and (min-width: 992px) {
      position: fixed;
      top: 0;
      z-index: 2;
  }
}

@media (min-width: $screen-lg-min) {
    .logo {
        width: 174px;
        margin-left: -52px;
    }
    header {
        position: fixed;
        top: 0px;
        z-index: 30;
    }
}
`;

const Logo = styled.h1`
  background: url(${logoImage}) left center;
  margin: 0px;
  margin-top: 2px;
  height: 42px;
  padding-left: 42px;
  font-size: 30px;
  background-repeat: no-repeat;
  background-size: contain;
  line-height: 46px;
  width: auto;
  float:left;
  @media (max-width: 992px) {
      margin-left: 0px;
      width: 50px;
  }
  @media (max-width: 768px) {
    width: 30px;
    margin-left: 0px;
    background-repeat: no-repeat;
    background-position: center left;
    text-indent: -99999px;     
  }
`;


class Header extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.verifyToken();
    }
  }
  render() {
    return (
      <HeaderContainer>
        <Container>
          <Link to="/">
            <Logo>Balistos</Logo>
          </Link>
          {this.props.loggedIn ?
            <div>
              <UserMenu
                onOpenLogoutClick={this.props.onOpenLogoutClick}
                onOpenCreatePlaylistClick={this.props.onOpenCreatePlaylistClick}
                username={this.props.username}
                loggedIn={this.props.loggedIn}
              />
              {this.props.logoutOpen ? <LogOut
                onLogoutClick={this.props.onLogoutClick}
              /> : undefined}

              {this.props.createPlaylistOpen ? <CreatePlaylist
                onCreatePlaylistSubmit={this.props.onCreatePlaylistSubmit}
              /> : undefined}
            </div> :
            <div>
              <UserMenu
                onOpenLoginClick={this.props.onOpenLoginClick}
                onOpenRegisterClick={this.props.onOpenRegisterClick}
                username={this.props.username}
                loggedIn={this.props.loggedIn}
              />
              {this.props.loginOpen ? <Login /> : undefined}
              {this.props.registerOpen ? <Register /> : undefined }
            </div>
          }
        </Container>
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
};

Header.defaultProps = {
  registerOpen: false,
  username: undefined,
  loggedIn: false,
  createPlaylistOpen: false,
  logoutOpen: false,
  loginOpen: false,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
