import React from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
    border: 1px solid #6d6d6d;
    position: absolute;
    z-index: 2;
    background: #ffffff;
    top: 50px;
    right: 5px;
    border-top: 0px;
    width: ${(props: DropdownProps) =>
        props.width ? `${props.width}px;` : '302px;'}
    padding: 10px;

    @media (min - width: 40em) {
        right: 15px;
    }
`;

interface DropdownProps {
    width?: number;
}

const Dropdown = (props: { width?: number; children: any }) => {
    function stopPropagation(event: any) {
        event.stopPropagation();
    }
    return (
        <DropdownContainer onClick={stopPropagation} {...props}>
            {props.children}
        </DropdownContainer>
    );
};

export default Dropdown;
