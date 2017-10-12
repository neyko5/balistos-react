import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../common/Input';
import Icon from '../../common/Icon';
import Button from '../../common/Button';

const Send = styled.div`
  padding: 10px;
  background: #e8e8e8;
  float: left;
  width: 100%;
`

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
      <Send>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="Send a message"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <Button type="submit" green right>
            <Icon message /> Chat
          </Button>
        </form>
      </Send>
    );
  }
}

ChatForm.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default ChatForm;
