import React from 'react';
const ChatMessage = props => (
  <div className="message">
    <span title={new Date(props.message.created_at).toLocaleString()} className={`author ${props.message.user.username === props.username ? 'green' : 'grey'}`}>{props.message.user.username}:</span><span>{props.message.message}</span>
  </div>
    );

module.exports = ChatMessage;
