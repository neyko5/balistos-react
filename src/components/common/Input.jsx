import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

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
  ${props => props.search && css`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #000;
    line-height: 15px;
  `}
`;

const Input = props => (
  <StyledInput
    type={props.type}
    name={props.name}
    onChange={props.onChange}
    value={props.value}
    search={props.search}
    placeholder={props.placeholder}
  />
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  search: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

Input.defaultProps = {
  search: false,
  value: '',
};

export default Input;
