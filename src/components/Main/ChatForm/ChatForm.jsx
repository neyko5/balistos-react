import React from 'react';
import PropTypes from 'prop-types';

import './ChatForm.css';

const ChatForm = (props) => {
  let message;
  const submitForm = (e) => {
    e.preventDefault();
    if (!message.value.trim()) {
      return;
    }
    props.sendMessage(message.value);
    message.value = '';
  };
  return (
    <div className="send">
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Send a message"
          ref={(node) => { message = node; }}
        />
        <button type="submit" className="button green chat">
          <i className="icon message" /> Chat</button>
      </form>
    </div>
  );
}

ChatForm.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default ChatForm;
