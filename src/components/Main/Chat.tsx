// @flow

import React from 'react';
import styled from 'styled-components';

import ChatMessage from './ChatMessage';
import ChatForm from './ChatForm';
import Icon from '../common/Icon';
import { ChatMessageType } from '../../types/index';

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
  username: string,
  sendMessage: (message: string) => void,
  messages: Array<ChatMessageType>,
}) => (
  <div>
    <BoxHeader>
      <Icon chat />
      <Title>Chat with your buddies</Title>
    </BoxHeader>
    <Chatbox id="chatbox">
      {props.messages.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
        .map(message => (<ChatMessage
          message={message}
          username={props.username}
          key={message.id}
        />))
      }
    </Chatbox>
    {props.username ? <ChatForm sendMessage={props.sendMessage} /> : undefined}
  </div>
);

export default Chat;
