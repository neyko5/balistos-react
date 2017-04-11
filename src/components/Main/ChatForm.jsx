import React from 'react';
import PropTypes from 'prop-types';

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(e) {
    e.preventDefault();
    if (!this.state.message.trim()) {
      return;
    }
    this.props.sendMessage(this.state.message);
    this.setState({ message: '' });
  }
  handleChange(event) {
    this.setState({ message: event.target.value });
  }
  render() {
    return (
      <div className="send">
        <form onSubmit={this.submitForm}>
          <input
            type="text"
            placeholder="Send a message"
            onChange={this.handleChange} value={this.state.message}
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

module.exports = ChatForm;
