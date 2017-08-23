import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendRegisterRequest, toggleLoginWindow, setRegisterError } from '../../../actions';

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
      <div className="dropdown" role="presentation" onClick={event => event.stopPropagation()}>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="register-username">
            <div className="title">Username</div>
            <div className="error">{this.props.error}</div>
            <input type="text" name="username" onChange={this.handleChange} value={this.state.username} />
          </label>
          <label htmlFor="register-password">
            <div className="title">Password</div>
            <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
          </label>
          <button className="button green" type="submit">Register</button>
          <div className="noaccount">Already have an account?
            <button
              href="#"
              className="link open-login"
              onClick={this.props.onOpenLoginClick}
            >Log in now!</button>
          </div>
        </form>
      </div>
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
