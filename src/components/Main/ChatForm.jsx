// @flow

import React from 'react';
import styled from 'styled-components';

import Input from '../common/Input';
import Icon from '../common/Icon';
import Button from '../common/Button';

const Send = styled.div`
  padding: 10px;
  background: #e8e8e8;
  float: left;
  width: 100%;
`;

type Props = {
  sendMessage: string => void
}

type State = {
  message: string,
}

class ChatForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange: Function;
  handleSubmit: Function;

  handleChange(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.setState({
        message: event.target.value,
      });
    }
  }

  handleSubmit(event: Event): void {
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

export default ChatForm;
