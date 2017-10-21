import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Message = styled.div`
  margin-bottom: 3px;
  color: #3e414c;
  font-size: 12px;
`;
export const Author = styled.span`
  margin-right: 3px;
  font-weight: 700;
  color: ${props => props.current ? '#9FA600': '#3e414c'}
`;

const ChatMessage = props => (
  <Message>
    <Author
      current={props.message.user.username === props.username}
      title={new Date(props.message.createdAt).toDateString()}
    >{props.message.user.username}:</Author>
    <span>{props.message.message}</span>
  </Message>
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
