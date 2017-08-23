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
  onSubmit: (e, username, password) => {
    e.preventDefault();
    if (username.value.trim().length < 4) {
      dispatch(setRegisterError('Username should be min 4 characters.'));
      return;
    }
    if (password.value.trim().length < 6) {
      dispatch(setRegisterError('Password should be min 6 characters.'));
      return;
    }
    dispatch(sendRegisterRequest(username.value, password.value));
    username.value = '';
    password.value = '';
  },
});

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  error: state.auth.registerError,
});

const Register = (props) => {
  let username;
  let password;
  return (
    <div className="dropdown" role="presentation" onClick={event => event.stopPropagation()}>
      <form onSubmit={e => props.onSubmit(e, username, password)}>
        <label htmlFor="register-username">
          <div className="title">Username</div>
          <div className="error">{props.error}</div>
          <input type="text" name="register-username" ref={(node) => { username = node; }} />
        </label>
        <label htmlFor="register-password">
          <div className="title">Password</div>
          <input type="password" name="register-password" ref={(node) => { password = node; }} />
        </label>
        <button className="button green" type="submit">Register</button>
        <div className="noaccount">Already have an account?
          <button
            href="#"
            className="link open-login"
            onClick={props.onOpenLoginClick}
          >Log in now!</button>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onOpenLoginClick: PropTypes.func.isRequired,
};

Register.defaultProps = {
  error: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
