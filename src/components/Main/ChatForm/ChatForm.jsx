import React from 'react';
import PropTypes from 'prop-types';

import './ChatForm.css';

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.message.trim()) {
      return;
    }
    this.props.sendMessage(this.state.message);
    this.setState({
      message: '',
    });
  }

  render() {
    return (
      <div className="send">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Send a message"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <button type="submit" className="button green chat">
            <i className="icon message" /> Chat</button>
        </form>
      </div>
    );
  }
}

ChatForm.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default ChatForm;
