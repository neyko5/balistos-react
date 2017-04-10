import React from 'react';

const ChatForm = React.createClass({
  submitForm(e) {
    e.preventDefault();
    if (!this.state.message.trim()) {
      return;
    }
    this.props.sendMessage(this.state.message);
    this.setState({ message: '' });
  },
  getInitialState() {
    return {
      message: '',
    };
  },
  handleChange(event) {
    this.setState({ message: event.target.value });
  },
  render() {
    return (
      <div className="send">
        <form onSubmit={this.submitForm}>
          <input type="text" placeholder="Send a message" onChange={this.handleChange} value={this.state.message} />
          <button type="submit" className="button green chat">
            <i className="icon message" />
                        Chat
                    </button>
        </form>
      </div>
    );
  },
});

module.exports = ChatForm;
