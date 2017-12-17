// @flow

import React from 'react';
import styled, { css } from 'styled-components';

import usersIcon from '../../img/users.png';
import type { UserType } from '../../types/index';

const Users = styled.div`
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 3px 3px 10px 10px;
  background: #F6F6F6;
  float: left;
  width: 100%;
  border: 1px solid #CCCCCC;
`;
const Header = styled.div`
  width: 100%;
  float: left;
`;
const HeaderTitle = styled.div`
  color: #3E414C;
  font-size: 13px;
  font-weight: 700;
  float: left;
  line-height: 28px;
`;

const Number = styled.div`
  background: #ffffff url(${usersIcon}) 6px center no-repeat;
  height: 28px;
  color: #3E414C;
  font-size: 12px;
  font-weight: 600;
  float: right;
  padding-left: 36px;
  padding-right: 10px;
  line-height: 28px;
`;

const Body = styled.div`
  float: left;
  width: 100%;
  margin: 5px 0px;
`;
const User = styled.div`
  margin-bottom: 5px;
  height: 24px;
  border-radius: 3px;
  float: left;
  margin-right: 5px;
  font-size: 12px;
  font-style: italic;
  line-height: 24px;
  padding: 0px 10px;
  background: #D0D7DD;
  color: #333333;
  ${props => props.green && css`
    background: #B1BB00;
    color: #ffffff;
  `}

`;

const ChatOnline = (props: {
  username: string,
  users: Array<UserType>,
}) => (
  <Users>
    <Header>
      <HeaderTitle>Users online</HeaderTitle>
      <Number>{props.users && props.users.length}</Number>
    </Header>
    <Body>
      {props.users && props.users.length && props.users.map(user => (
        <User
          green={user.username === props.username}
          key={user.username}
        >{user.username}
        </User>
      ))}
    </Body>
  </Users>
);
export default ChatOnline;
