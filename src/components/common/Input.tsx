import React from 'react';
import styled, { css } from 'styled-components';

const StyledInput = styled.input`
    background: #f7f9f9;
    border: 1px solid #d9e0e2;
    width: 100%;
    height: 35px;
    border-radius: 3px;
    font-size: 13px;
    line-height: 13px;
    padding: 11px 10px;
    margin-bottom: 7px;
    ${(props: Props) =>
        props.search &&
        css`
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border: 1px solid #000;
            line-height: 15px;
        `}
`;

const Input = (props: Props) => (
    <StyledInput
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        search={props.search}
        autoComplete="off"
        placeholder={props.placeholder}
    />
);

type Props = {
    type: string;
    name: string;
    onChange: (event: any) => void;
    value?: string;
    search?: boolean;
    placeholder?: string;
    autocomplete?: string;
};

export default Input;
