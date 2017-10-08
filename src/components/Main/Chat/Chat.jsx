import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChatMessage from '../ChatMessage';
import ChatForm from '../ChatForm';

const Chatbox = styled.div`
  padding: 12px 10px;
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
`;

const Chat = props => (
  <div className="box">
    <div className="header">
      <i className="icon chat" />
      <div className="title">Chat with your buddies</div>
    </div>
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

Chat.propTypes = {
  username: PropTypes.string,
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};


Chat.defaultProps = {
  username: undefined,
};

export default Chat;
