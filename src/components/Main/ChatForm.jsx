import React from 'react';

class ChatForm extends React.Component {
  getInitialState() {
    return {
      message: '',
    };
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
  sendMessage: React.PropTypes.function.isRequired,
};

module.exports = ChatForm;
