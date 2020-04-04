import React from 'react'
import styled from 'styled-components'

const DropdownContainer = styled.div`
    border: 1px solid #6d6d6d;
    position: absolute;
    z-index: 2;
    background: #ffffff;
    top: 50px;
    right: 5px;
    border-top: 0px;
    padding: 10px;
    width: ${(props: DropdownProps) => (props.small ? '210px' : '302px')};

    @media (min-width: 40em) {
        right: 15px;
    }
`

interface DropdownProps {
    small?: boolean
}

const Dropdown = (props: { small?: boolean; children: any }) => {
    function stopPropagation(event: any) {
        event.stopPropagation()
    }
    return (
        <DropdownContainer onClick={stopPropagation} small={props.small}>
            {props.children}
        </DropdownContainer>
    )
}

Dropdown.defaultProps = {
    small: false,
}

export default Dropdown
