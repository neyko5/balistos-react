import React from 'react';
import PropTypes from 'prop-types';
import ChatMessage from '../ChatMessage';
import ChatForm from '../ChatForm';

import './Chat.css';

const Chat = props => (
  <div className="box">
    <div className="header">
      <i className="icon chat" />
      <div className="title">Chat with your buddies</div>
    </div>
    <div className="chatbox" id="chatbox">
      {props.messages.sort((a, b) => a.created_at < b.created_at ? -1 : 1)
        .map(message => <ChatMessage
          message={message} username={props.username} key={message.id}
        />)
      }
    </div>
    {props.username ? <ChatForm sendMessage={props.sendMessage} /> : undefined}
  </div>
);

Chat.propTypes = {
  username: PropTypes.string,
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(
      PropTypes.shape({
        created_at: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
  ).isRequired,
};


Chat.defaultProps = {
  username: undefined,
};

export default Chat;
