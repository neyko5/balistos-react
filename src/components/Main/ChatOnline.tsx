// @flow

import React from 'react';
import styled, { css } from 'styled-components';

import usersIcon from '../../img/users.png';
import { UserType, AuthUserType } from '../../types/index';

const Users = styled.div`
    margin-top: 15px;
    margin-bottom: 10px;
    padding: 3px 3px 10px 10px;
    background: #f6f6f6;
    float: left;
    width: 100%;
    border: 1px solid #cccccc;
`;
const Header = styled.div`
    width: 100%;
    float: left;
`;
const HeaderTitle = styled.div`
    color: #3e414c;
    font-size: 13px;
    font-weight: 700;
    float: left;
    line-height: 28px;
`;

const Count = styled.div`
    background: #ffffff url(${usersIcon}) 6px center no-repeat;
    height: 28px;
    color: #3e414c;
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
    background: #d0d7dd;
    color: #333333;
    ${(props: UserProps) =>
        props.green &&
        css`
            background: #b1bb00;
            color: #ffffff;
        `}
`;

interface UserProps {
    green: boolean;
}

const ChatOnline = (props: { user: AuthUserType; users: UserType[] }) => (
    <Users>
        <Header>
            <HeaderTitle>Users online</HeaderTitle>
            <Count>{props.users && props.users.length}</Count>
        </Header>
        <Body>
            {props.users &&
                props.users.length &&
                props.users.map((user) => (
                    <User green={user.id === props.user.uid} key={user.id}>
                        {user.name}
                    </User>
                ))}
        </Body>
    </Users>
);
export default ChatOnline;
