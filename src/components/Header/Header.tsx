
// @flow
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Dispatch } from "redux";
import styled from "styled-components";

import Container from "../common/Container";
import CreatePlaylist from "./CreatePlaylist";
import Login from "./Login";
import LogOut from "./LogOut";
import Register from "./Register";
import UserMenu from "./UserMenu";

import logoImage from "../../img/logo.png";

import {
  createPlaylist,
  logOut,
  toggleCreatePlaylistWindow,
  toggleLoginWindow,
  toggleLogoutWindow,
  toggleRegisterWindow,
  verifyToken,
} from "../../actions";

const mapStateToProps = (state: any) => ({
  username: state.auth.username,
  loggedIn: state.auth.loggedIn,
  loginOpen: state.windows.loginOpen,
  registerOpen: state.windows.registerOpen,
  logoutOpen: state.windows.logoutOpen,
  createPlaylistOpen: state.windows.createPlaylistOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
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
  onCreatePlaylistSubmit: (title: string, description: string) => {
    dispatch(createPlaylist(title, description));
  },
});

const HeaderContainer = styled.header`
  height: 50px;
  width: 100%;
  background-color: #333333;
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
  @media (min-width: 320px) and (max-width: 479px) {
    header {
        height: auto;
    }
  }
`;

const RightMenu = styled.div`
  align-self: flex-end;
  flex: 1;
`;

const LogoLink = styled(Link)`
  display: flex;
  text-decoration: none;
  height: 50px;
  align-items: center;
`;

const Title = styled.title`
  display: flex;
  align-items: flex-end;
  height: 48px;
  margin-left: 8px;
  color: #f0f0f0;
  font-weight: 200;
  font-size: 36px;
`;

const Logo = styled.img`
  height: 40px;
`;

interface Props {
  verifyToken: () => void;
  onOpenLoginClick: () => void;
  onOpenRegisterClick: () => void;
  onOpenLogoutClick: () => void;
  onCreatePlaylistSubmit: (title: string, description: string) => void;
  onLogoutClick: () => void;
  onOpenCreatePlaylistClick: () => void;
  createPlaylistOpen: boolean;
  logoutOpen: boolean;
  registerOpen: boolean;
  loginOpen: boolean;
  loggedIn: boolean;
  username: string;
}

interface State {
}

class Header extends React.Component<Props, State> {
  public componentDidMount() {
    if (this.props.loggedIn) {
      this.props.verifyToken();
    }
  }

  public render() {
    return (
      <HeaderContainer>
        <Container>
          <LogoLink to="/" id="logo">
            <Logo src={logoImage} />
            <Title>Balistos</Title>
          </LogoLink>
          {this.props.loggedIn ?
            <RightMenu>
              <UserMenu
                onOpenLogoutClick={this.props.onOpenLogoutClick}
                onOpenCreatePlaylistClick={this.props.onOpenCreatePlaylistClick}
                username={this.props.username}
                loggedIn={this.props.loggedIn}
              />
              {this.props.logoutOpen && <LogOut
                onLogoutClick={this.props.onLogoutClick}
              />}

              {this.props.createPlaylistOpen && <CreatePlaylist
                onCreatePlaylistSubmit={this.props.onCreatePlaylistSubmit}
              />}
            </RightMenu> :
            <RightMenu>
              <UserMenu
                onOpenLoginClick={this.props.onOpenLoginClick}
                onOpenRegisterClick={this.props.onOpenRegisterClick}
                username={this.props.username}
                loggedIn={this.props.loggedIn}
              />
              {this.props.loginOpen && <Login />}
              {this.props.registerOpen && <Register />}
            </RightMenu>
          }
        </Container>
      </HeaderContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
