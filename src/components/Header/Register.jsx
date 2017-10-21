import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { sendRegisterRequest, toggleLoginWindow, setRegisterError } from '../../actions';
import Dropdown from './Dropdown';
import Input from '../common/Input';
import Button from '../common/Button';

const mapDispatchToProps = dispatch => ({
  setErrorMessage: (message) => {
    dispatch(setRegisterError(message));
  },
  onOpenLoginClick: () => {
    dispatch(toggleLoginWindow());
  },
  onSubmit: (username, password) => {
    if (username.trim().length < 4) {
      dispatch(setRegisterError('Username should be min 4 characters.'));
      return;
    }
    if (password.trim().length < 6) {
      dispatch(setRegisterError('Password should be min 6 characters.'));
      return;
    }
    dispatch(sendRegisterRequest(username, password));
  },
});

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  error: state.auth.registerError,
});

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

const ErrorMessage = styled.div`
  float: right;
  font-size: 11px;
  line-height: 24px;
  color: #ff4f00;
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


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
    this.props.onSubmit(this.state.username, this.state.password);
    this.setState({
      username: '',
      password: '',
    });
  }

  render() {
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
          <Button green topMargin type="submit">Register</Button>
          <NoAccount>Already have an account?
            <NoAccountLink
              onClick={this.props.onOpenLoginClick}
            >Log in now!
            </NoAccountLink>
          </NoAccount>
        </form>
      </Dropdown>
    );
  }
}

Register.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onOpenLoginClick: PropTypes.func.isRequired,
};

Register.defaultProps = {
  error: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
