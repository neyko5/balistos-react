// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import chatIcon from '../../img/chat.png';
import noteIcon from '../../img/note.png';
import messageIcon from '../../img/message.png';

const StyledIcon = styled.i`
    width: 26px;
    height: 26px;
    background-position: center;
    background-repeat: no-repeat;
    float: left;
    margin-top: 6px;
    margin-right: 6px;
    ${props => props.note && css`
        background-image: url(${noteIcon});
        margin-top: 0px;
    `}
    ${props => props.chat && css`
        background-image: url(${chatIcon});
        margin-top: 0px;
    `}
    ${props => props.message && css`
        background-image: url(${messageIcon});
    `}
`;

const Icon = (props: {
    message?: boolean,
    note?: ?boolean,
    chat?: ?boolean,
}) => (
  <StyledIcon {...props} />
);

Icon.defaultProps = {
  message: false,
  note: false,
  chat: false,
};

export default Icon;
