import React from 'react';

const ChatMessage = props => (
  <div className="message">
    <span
      title={new Date(props.message.created_at).toLocaleString()}
      className={`author ${props.message.user.username === props.username ? 'green' : 'grey'}`}
    >{props.message.user.username}:</span><span>{props.message.message}</span>
  </div>
    );

ChatMessage.propTypes = {
  username: React.PropTypes.string.isRequired,
  message: React.PropTypes.shape({
    user: React.PropTypes.shape({
      username: React.propTypes.string.isRequired,
    }).isRequired,
    message: React.propTypes.string.isRequired,
    created_at: React.propTypes.string.isRequired,
  }).isRequired,
};

module.exports = ChatMessage;
