import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import logoImage from '../../img/logo.png';
import Container from '../common/Container';
import CreatePlaylist from './CreatePlaylist';
import Login from './Login';
import LogOut from './LogOut';
import User from './User';
import { AuthUserType } from '../../types';

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
    display: flex;
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

interface MenuButtonProps {
    borderLeft?: boolean;
    onClick?: () => void;
}

const MenuButton = styled.button`
  height: 50px;
  border-right: 1px solid #333;
  border-left: 1px solid #333;
  padding: 0 20px;
  line-height: 50px;
  color: #dcdcdc;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  align-self: flex-end;
  ${(props: MenuButtonProps) =>
      props.borderLeft &&
      css`
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

const Menu = styled.div`
    position: relative;
`;

interface Props {
    user: AuthUserType;
}

const Header = (props: Props) => {
    const [open, setOpen] = React.useState<string>('');

    function stopPropagation(event: any) {
        event.stopPropagation();
    }

    function openCreatePlaylist() {
        setOpen('createPlaylist');
    }

    function openLogout() {
        setOpen('logout');
    }

    function openLogin() {
        setOpen('login');
    }

    return (
        <HeaderContainer>
            <Container>
                <LogoLink to="/" id="logo">
                    <Logo src={logoImage} />
                    <Title>Balistos</Title>
                </LogoLink>
                {props.user.uid ? (
                    <RightMenu>
                        <Menu onClick={stopPropagation}>
                            <MenuButton onClick={openCreatePlaylist}>
                                New playlist
                            </MenuButton>
                        </Menu>
                        {open === 'logout' && <LogOut />}
                        {open === 'createPlaylist' && (
                            <CreatePlaylist setOpen={setOpen} />
                        )}
                        <User
                            name={props.user.displayName}
                            avatar={props.user.photoURL}
                            onClick={openLogout}
                        />
                    </RightMenu>
                ) : (
                    <RightMenu>
                        <Menu>
                            <MenuButton borderLeft={true} onClick={openLogin}>
                                Log in
                            </MenuButton>
                            {open === 'login' && <Login />}
                        </Menu>
                    </RightMenu>
                )}
            </Container>
        </HeaderContainer>
    );
};

export default connect((state: any) => {
    return {
        user: state.firebase.auth,
    };
})(Header);
