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
  componentDidUpdate(prevProps) {
    if (prevProps.messages.length && this.props.messages.length > prevProps.messages.length) {
      const newMessage = [...this.props.messages].pop();
      if (newMessage.user.username !== this.props.username) {
        const options = {
          body: `${newMessage.user.username}: ${newMessage.message}`,
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAWCAYAAAAxSueLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8xMC8xNMmEH5sAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAACPElEQVRIiZ2VMZbTMBCGv+RtQYc5wYYTrLkADm5o8CPptltzApIbZE+woaTCOQHep15rlXTejjK5gdPRhUIjLBzFcXbe85Mljeaf0fwzGh0OB0KSpNkEmAFTIAIS2doBW6ACSqNVHTQQkFEXLEmzCFgDdwNtGGBltKouAkvSbAYUwGtZ2mMjqGUEiOWbAteerW9Gq8UgsCTNcuCHB7ICCqNVc+qwOLf2QDdGq7wXTPJTS0Q7YDY0F4FrnxutypDuWMaVAO2B6SVJN1o1Es2zLK1P6Tow59XaaLUdCtSRmYzXcr1HMnr/4dMUeJL5WweWpNkCS4SF0ao5N5czNXAjtgyQ+867yOxuCxQBD9iIF+fmnglHpj/YuqyTNIuDYEIUxNMCS/fi3NwzEcn4HSixPKicXcfGRjbujVYrXiBJmk1p0zE3WpVJmv3E5nJjtMpdZI6qCz/sC8WxcOdRfynjHfxP/T1t2IMBkzSLkjSraInxL4fCgVr0pmNvMRcdB7gSIvQB5WLMNelNoKD37mdIb4yxLIuxBIiBCce9MZhvjw9vTnX92jO0pO0wITHYWjvqOl6/rY1W764CQEXH44eOjV/YOqqwZbANeSB5d6S5B7jq6BTA58DZHfAb+Ai8Am772pqUgauzwuVx3NGrvP9n4BH4YrSaALfY673Bdoa1z1phpZs/CVBJS//jl7pPvDaV96g90t7OHpvP4mIwDzQGvtK+2k4a2pbly9xoVb4IrMeJCNst/CdmCyyNVs1f0AcWcVDaseIAAAAASUVORK5CYII=',
          tag: 'chat',
          requireInteraction: false,
        };
        new Notification(`Balistos - ${this.props.playlist.title}`, options);
      }
    }
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
  }
  render() {
    return (
      <div className="col-lg-6 col-md-6 col-sm-5 no-gutter">
        {this.props.users && this.props.users.length ?
          <ChatOnline users={this.props.users} username={this.props.username} /> : undefined}
        <Chat
          messages={this.props.messages}
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
  messages: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

ChatContainer.defaultProps = {
  users: [],
  username: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
