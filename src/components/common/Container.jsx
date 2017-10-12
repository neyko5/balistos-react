import React from 'react';
import styled from 'styled-components';

let ContainerComponent = styled.div`
    position: relative;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    @media (min-width: 1280px) {
        width: 1250px;
    }
    @media (max-width: 992px) {
        width: 970px;
    }
    @media (max-width: 768px) {
        width: 750px;        
    }
    @media (max-width: 767px) and (min-width: 480px) {
        width: 480px;
        padding: 0;
    }
    @media (max-width: 479px) and (min-width: 320px) {
        width: 320px;
        padding: 0;
    }

`;

const Container = (props) => {
  return (
    <ContainerComponent>
        {props.children}
    </ContainerComponent>
  );
};

export default Container;
