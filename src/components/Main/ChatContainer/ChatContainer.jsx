import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chat from '../Chat';
import ChatOnline from '../ChatOnline';
import { sendMessage } from '../../../actions';

function mapStateToProps(state) {
  return {
    messages: state.playlist.messages,
    users: state.playlist.users,
    username: state.auth.username,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  sendMessage: (message) => {
    dispatch(sendMessage(message, ownProps.id));
  },
});

class ChatContainer extends React.Component {
  componentDidUpdate() {
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
  }
  render() {
    return (
      <div className="chat-container col-lg-12 col-md-12 col-sm-5 col-xs-12 no-gutter">
        {this.props.users && this.props.users.length ?
          <ChatOnline users={this.props.users} username={this.props.username} /> : undefined}
        <Chat
          messages={this.props.playlist.messages}
          sendMessage={this.props.sendMessage}
          username={this.props.username}
        />
      </div>
    );
  }
}

ChatContainer.propTypes = {
  username: PropTypes.string,
  sendMessage: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object.isRequired),
  playlist: PropTypes.shape({
    messages: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  }).isRequired,
};

ChatContainer.defaultProps = {
  users: [],
  username: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
