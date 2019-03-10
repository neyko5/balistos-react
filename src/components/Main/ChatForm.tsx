// @flow

import React, { FormEvent } from "react";
import styled from "styled-components";

import Button from "../common/Button";
import Icon from "../common/Icon";
import Input from "../common/Input";

const Send = styled.div`
  padding: 10px;
  background: #e8e8e8;
  float: left;
  width: 100%;
`;

interface Props {
  sendMessage: (message: string) => void;
}

interface State {
  message: string;
}

class ChatForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChange(event: FormEvent<HTMLFormElement>): void {
    if (event.target instanceof HTMLInputElement) {
      this.setState({
        message: event.target.value,
      });
    }
  }

  public handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!this.state.message.trim()) {
      return;
    }
    this.props.sendMessage(this.state.message);
    this.setState({
      message: "",
    });
  }

  public render() {
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
          <Button type="submit" green={true} right={true}>
            <Icon message={true} /> Chat
          </Button>
        </form>
      </Send>
    );
  }
}

export default ChatForm;
