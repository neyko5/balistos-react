// @flow

import React from 'react';
import styled, { css } from 'styled-components';

import userIcon from '../../img/user.png';
import arrowDownIcon from '../../img/dropdown.png';

const Menu = styled.div`
  position: relative;
  float: right;
`;

const MenuButton = styled.button`
  height: 50px;
  border-right: 1px solid #333;
  border-left: 1px solid #333;
  padding: 0 20px;
  line-height: 50px;
  color: #dcdcdc;
  font-size: 13px;
  float: left;
  font-weight: 700;
  cursor: pointer;
  align-self: flex-end;
  ${(props: MenuButtonProps) => props.borderLeft && css`
    border-right: 0px;
  `}
  &:active {
    background: #111;
    color: #666;
  }
  @media (min-width:320px) and (max-width:479px) {
    border-bottom: 1px solid #333;
    padding: 0px 10px;
  }
}
`;

type MenuButtonProps = {
  borderLeft?: boolean,
  onClick?: () => void
}

const User = styled.button`
  margin-left: 10px;
  float: left;
  margin-top: 13px;
`;

const UserIcon = styled.div`
  background: url(${userIcon});
  width: 24px;
  height: 24px;
  float: left;
  margin-right: 8px;
`;

const Username = styled.div`
  font-size: 15px;
  float: left;
  color: #adbf00;
  margin-left: 4px;
  line-height: 24px;
  font-weight: 400;
`;

const ArrowDown = styled.div`
  width: 24px;
  height: 24px;
  float: left;
  background: url(${arrowDownIcon});
  cursor: pointer;
  margin-left: 8px;
`;

const UserMenu = (props: Props) => (
  props.loggedIn ?
    <Menu onClick={event => event.stopPropagation()}>
      <MenuButton
        onClick={props.onOpenCreatePlaylistClick}
      >New playlist
      </MenuButton>
      <User onClick={props.onOpenLogoutClick} >
        <UserIcon />
        <Username id="username">{props.username}</Username>
        <ArrowDown />
      </User>
    </Menu> :
    <Menu onClick={event => event.stopPropagation()}>
      <MenuButton
        id="log-in-button"
        borderLeft
        onClick={props.onOpenLoginClick}
      >Log in
      </MenuButton>
      <MenuButton
        id="register-button"
        onClick={props.onOpenRegisterClick}
      >Register
      </MenuButton>
    </Menu>
);

type Props = {
  loggedIn: boolean,
  borderLeft?: boolean,
  onOpenLoginClick?: () => void,
  onOpenRegisterClick?: () => void,
  onOpenLogoutClick?: () => void,
  username?: string,
  onOpenCreatePlaylistClick?: () => void,
}

UserMenu.defaultProps = {
  onOpenLoginClick: undefined,
  onOpenRegisterClick: undefined,
  onOpenLogoutClick: undefined,
  username: undefined,
  onOpenCreatePlaylistClick: undefined,
};


export default UserMenu;
