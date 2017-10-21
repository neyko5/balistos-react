import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DropdownContainer = styled.div`
    border: 1px solid #6d6d6d;
    position: absolute;
    z-index: 2;
    background: #ffffff;
    top: 50px;
    right: 5px;
    border-top: 0px;
    padding: 10px;
    width: ${props => (props.small ? '210px' : '302px')};

    @media (min-width: 40em) {
        right: 15px;
    }
`;

const Dropdown = props => (
  <DropdownContainer onClick={event => event.stopPropagation()} small={props.small}>
    {props.children}
  </DropdownContainer>
);

Dropdown.propTypes = {
  small: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node,
  ]),
};

Dropdown.defaultProps = {
  small: false,
  children: undefined,
};

export default Dropdown;
