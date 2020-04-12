import React from 'react';
import styled from 'styled-components';

import { ChatMessageType } from '../../types/index';
import Icon from '../common/Icon';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';

const Chatbox = styled.div`
    padding: 12px 10px;
    width: 100%;
    max-height: 300px;
    overflow-y: scroll;
`;

const Title = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    line-height: 26px;
`;

const BoxHeader = styled.div`
    width: 100%;
    padding-left: 5px;
    margin-bottom: 5px;
`;

const Chat = (props: {
    user: any;
    id: string;
    messages: ChatMessageType[];
}) => {
    return (
        <>
            <BoxHeader>
                <Icon chat={true} />
                <Title>Chat with your buddies</Title>
            </BoxHeader>
            <Chatbox id="chatbox">
                {props.messages.map((message) => (
                    <ChatMessage
                        message={message}
                        user={props.user}
                        key={message.id}
                    />
                ))}
            </Chatbox>
            {props.user && !props.user.isEmpty && <ChatForm id={props.id} />}
        </>
    );
};

export default Chat;
