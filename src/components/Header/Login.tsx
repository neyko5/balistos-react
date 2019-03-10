import React, { FormEvent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Dispatch } from "redux";
import { sendLoginRequest, toggleRegisterWindow } from "../../actions";
import Button from "../common/Button";
import Input from "../common/Input";
import Dropdown from "./Dropdown";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onOpenRegisterClick: () => {
    dispatch(toggleRegisterWindow());
  },
  onSubmit: (username: string, password: string) => {
    dispatch(sendLoginRequest(username, password));
  },
});
const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps,
  error: state.auth.loginError,
});

const ErrorMessage = styled.div`
  float: right;
  font-size: 11px;
  line-height: 24px;
  color: #ff4f00;
`;

const NoAccount = styled.div`
  margin-top: 10px;
  float: right;
  color: #3e414c;
  font-size: 11px;
  line-height: 38px;
`;

const NoAccountLink = styled.button`
  color: #ff4f00;
  cursor: pointer;
  border: none;
  background: transparent;
`;

const LabelTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: #3e414c;
  float: left;
  line-height: 24px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  margin-right: 20px;
  width: 100%;
  float: left;
  padding-bottom: 5px;
`;

interface Props {
  onSubmit: (arg0: string, arg1: string) => void;
  error?: string;
  onOpenRegisterClick: () => void;
}

interface State {
  username: string;
  password: string;
}

class Login extends React.Component<Props, State> {
  public static defaultProps = {
    error: "",
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChange(event: FormEvent<HTMLFormElement>) {
    const update: any = {};
    const target = event.target as HTMLInputElement;
    update[target.name] = target.value;
    this.setState(update);
  }

  public handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.onSubmit(this.state.username, this.state.password);
    this.setState({
      username: "",
      password: "",
    });
  }

  public render() {
    return (
      <Dropdown>
        <form onSubmit={this.handleSubmit}>
          <Label htmlFor="username">
            <LabelTitle>Username</LabelTitle>
            <ErrorMessage>{this.props.error}</ErrorMessage>
            <Input
              type="text"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
          </Label>
          <Label htmlFor="password">
            <LabelTitle>Password</LabelTitle>
            <Input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Label>
          <Button type="submit" green={true} topMargin={true}>Log In</Button>
          <NoAccount>No account yet?
            <NoAccountLink
              onClick={this.props.onOpenRegisterClick}
            >Create one now!
            </NoAccountLink>
          </NoAccount>
        </form>
      </Dropdown>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
