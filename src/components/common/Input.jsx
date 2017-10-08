import React from 'react';
import styled from 'styled-components';

let StyledInput = styled.input`
    background: #F7F9F9;
    border: 1px solid #D9E0E2;
    width: 100%;
    height: 35px;
    border-radius: 3px;
    font-size: 13px;
    line-height: 13px;
    padding: 11px 10px;
    margin-bottom: 7px;
`;

const Input = (props) => {
  return (
    <StyledInput  type={props.type}
        name={props.name}
        onChange={props.onChange}
        value={props.value} />
  );
};

export default Input;
