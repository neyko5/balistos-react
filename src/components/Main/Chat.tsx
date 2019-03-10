// @flow

import React from "react";
import styled from "styled-components";

import { ChatMessageType } from "../../types/index";
import Icon from "../common/Icon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

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
  messages: ChatMessageType[],
}) => (
  <div>
    <BoxHeader>
      <Icon chat={true} />
      <Title>Chat with your buddies</Title>
    </BoxHeader>
    <Chatbox id="chatbox">
      {props.messages.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
        .map((message) => (<ChatMessage
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
