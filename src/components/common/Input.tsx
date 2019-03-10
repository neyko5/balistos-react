// @flow

import React from "react";
import styled, { css } from "styled-components";

const StyledInput = styled.input`
  background: #F7F9F9;
  border: 1px solid #D9E0E2;
  width: 100%;
  height: 35px;
  border-radius: 3px;
  font-size: 13px;
  line-height: 13px;
  padding: 11px 10px;
  margin-bottom: 7px;
  ${(props: Props) => props.search && css`
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
    placeholder={props.placeholder}
  />
);

interface Props {
  type: string;
  name: string;
  onChange: (event: any) => void;
  value?: string;
  search?: boolean;
  placeholder?: string;
}

Input.defaultProps = {
  search: false,
  value: "",
  placeholder: "",
};

export default Input;
