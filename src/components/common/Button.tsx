// @flow

import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
    height: 38px;
    line-height: 38px;
    padding: 0 10px;
    font-size: 13px;
    font-weight: 700;
    float: left;
    border: 0;
    border-radius: 5px;
    margin-bottom: 2px;
    margin-right: 2px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    outline: none;
    ${(props: Props) => props.green && css`
        color: #fff;
        background: #b1bb00;
        -webkit-box-shadow: 2px 2px 0 #9fa800;
        box-shadow: 2px 2px 0 #9fa800;
    `}
    ${(props: Props) => props.topMargin && css`
        margin-top: 10px;
    `}
    ${(props: Props) => props.right && css`
        float: right;
    `}
`;

const Button = (props: Props) => (
  <StyledButton {...props}>
    {props.children}
  </StyledButton>
);

type Props = {
    children: any,
    green: boolean,
    topMargin?: boolean,
    right?: boolean,
    type?: string,
    onClick?: () => void
}

export default Button;
