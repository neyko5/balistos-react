import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContainerComponent = styled.div`
    margin: 0px auto;
    margin-left: auto;
    display: flex;
    max-width: 1250px;
    padding: 0px 5px;
    @media (min-width: 40em) {
        padding: 0px 15px;
    }
`;

const Container = props => (
  <ContainerComponent>
    {props.children}
  </ContainerComponent>
);

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node,
  ]),
};

Container.defaultProps = {
  children: undefined,
};

export default Container;
