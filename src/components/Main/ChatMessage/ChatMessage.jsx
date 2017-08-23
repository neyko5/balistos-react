import React from 'react';
import PropTypes from 'prop-types';

const ChatMessage = props => (
  <div className="message">
    <span
      title={new Date(props.message.createdAt).toDateString()}
      className={`author ${props.message.user.username === props.username ? 'green' : 'grey'}`}
    >{props.message.user.username}:</span>
    <span className="content">{props.message.message}</span>
  </div>
);

ChatMessage.propTypes = {
  username: PropTypes.string,
  message: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

ChatMessage.defaultProps = {
  username: undefined,
};

export default ChatMessage;
