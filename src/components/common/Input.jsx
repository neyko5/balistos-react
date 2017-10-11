import React from 'react';
import styled, {css} from 'styled-components';

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
  ${props => props.search && css`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    width: 546px;
    border: 1px solid #000;
    float: left;
    line-height: 15px;
  `}
`;

const Input = (props) => {
  return (
    <StyledInput  type={props.type}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        search={props.search}
        placeholder={props.placeholder} />
  );
};

export default Input;
