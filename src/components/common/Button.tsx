import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
    height: 38px;
    line-height: 38px;
    padding: 0 10px;
    font-size: 13px;
    font-weight: 700;
    border: 0;
    border-radius: 5px;
    margin-bottom: 2px;
    margin-right: 2px;
    outline: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    outline: none;
    ${(props: Props) => {
        switch (props.color) {
            case 'green':
                return css`
                    color: #fff;
                    background: #b1bb00;
                    box-shadow: 2px 2px 0 #9fa800;
                `;
            case 'facebook':
                return css`
                    color: #fff;
                    background: #3b5998;
                    box-shadow: 2px 2px 0 #34528e;
                `;
            case 'google':
                return css`
                    color: ##757575;
                    background: white;
                    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.25);
                    border: 1px solid rgba(0, 0, 0, 0.25);
                    text-align: left;
                `;
        }
    }}
    ${(props: Props) =>
        props.topMargin &&
        css`
            margin-top: 10px;
        `}
    ${(props: Props) => props.fullWidth && `width: 100%;`}
`;

const Button = (props: Props) => (
    <StyledButton {...props} type={props.type || 'button'}>
        {props.children}
    </StyledButton>
);

interface Props {
    children: any;
    color: string;
    topMargin?: boolean;
    right?: boolean;
    fullWidth?: boolean;
    type?: 'button' | 'submit' | 'reset';
    id?: string;
    onClick?: () => void;
}

export default Button;
