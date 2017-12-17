// @flow

import React from 'react';
import styled from 'styled-components';

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

const Container = (props: {
  children: any
}) => (
  <ContainerComponent>
    {props.children}
  </ContainerComponent>
);

export default Container;
