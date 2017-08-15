import React from 'react';
import PropTypes from 'prop-types';

import './ChatOnline.css';

const ChatOnline = props => (
  <div className="users">
    <div className="header">
      <div className="title">Users online</div>
      <div className="number">{props.users && props.users.length}</div>
    </div>
    <div className="body">
      {props.users && props.users.length && props.users.map(user => <div
        className={`user ${user.username === props.username ? 'green' : 'grey'}`}
        key={user.username}
      >{user.username}</div>)}
    </div>
  </div>
);

ChatOnline.propTypes = {
  username: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

ChatOnline.defaultProps = {
  username: undefined,
};

export default ChatOnline;
