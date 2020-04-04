import React from 'react';
import styled from 'styled-components';
import arrowDownIcon from '../../img/dropdown.png';

const User = styled.button`
    margin-left: 10px;
    display: flex;
    flex-direction: row;
`;

const UserAvatar = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 8px;
    border-radius: 12px;
`;

const Username = styled.div`
    font-size: 15px;
    color: #adbf00;
    margin-left: 4px;
    line-height: 24px;
    font-weight: 400;
`;

const ArrowDown = styled.div`
    width: 24px;
    height: 24px;
    background: url(${arrowDownIcon});
    cursor: pointer;
    margin-left: 8px;
`;

export default (props) => (
    <User onClick={props.onClick}>
        <UserAvatar src={props.avatar} />
        <Username>{props.name}</Username>
        <ArrowDown />
    </User>
);
