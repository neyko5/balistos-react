import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { sendLoginRequest, toggleRegisterWindow } from '../../../actions';
import Dropdown from '../Dropdown/Dropdown';
import Input from '../../common/Input';
import Button from '../../common/Button';

const mapDispatchToProps = dispatch => ({
  onOpenRegisterClick: () => {
    dispatch(toggleRegisterWindow());
  },
  onSubmit: (username, password) => {
    dispatch(sendLoginRequest(username, password));
  },
});
const mapStateToProps = (state, ownProps) => ({
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

const NoAccountLink = styled.button `
  color: #ff4f00;
  cursor: pointer;
  border: none;
  background: transparent;
`;

class Login extends React.Component {
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
          <label htmlFor="username">
            <div className="title">Username</div>
            <ErrorMessage>{this.props.error}</ErrorMessage>
            <Input type="text" name="username" onChange={this.handleChange} value={this.state.username} />
          </label>
          <label htmlFor="password">
            <div>Password</div>
            <Input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </label>
          <Button type="submit" green>Log In</Button>
          <NoAccount>No account yet?
            <NoAccountLink
              onClick={this.props.onOpenRegisterClick}
            >Create one now!</NoAccountLink>
          </NoAccount>
        </form>
      </Dropdown>
    );
  }
}

Login.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onOpenRegisterClick: PropTypes.func.isRequired,
};

Login.defaultProps = {
  error: undefined,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
