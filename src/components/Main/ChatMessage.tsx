// @flow

import React from "react";
import styled from "styled-components";
import { ChatMessageType } from "../../types/index";

const Message = styled.div`
  margin-bottom: 3px;
  color: #3e414c;
  font-size: 12px;
`;
export const Author = styled.span`
  margin-right: 3px;
  font-weight: 700;
  color: ${(props: AuthorProps) => (props.current ? "#9FA600" : "#3e414c")}
`;

interface AuthorProps {
  current: boolean;
}
const ChatMessage = (props: {
  username: string,
  message: ChatMessageType,
}) => (
  <Message>
    <Author
      current={props.message.user.username === props.username}
      title={new Date(props.message.createdAt).toDateString()}
    >{props.message.user.username}:
    </Author>
    <span>{props.message.message}</span>
  </Message>
);

export default ChatMessage;
