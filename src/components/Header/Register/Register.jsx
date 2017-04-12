import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendRegisterRequest, toggleLoginWindow, setRegisterError } from '../../../actions';

const mapDispatchToProps = dispatch => ({
  sendRegister: (username, email, password) => {
    dispatch(sendRegisterRequest(username, email, password));
  },
  setErrorMessage: (message) => {
    dispatch(setRegisterError(message));
  },
  onOpenLoginClick: () => {
    dispatch(toggleLoginWindow());
  },
});

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  error: state.auth.register_error,
});

const Register = (props) => {
  let username;
  let password;
  return (
    <div className={`dropdown ${props.open ? '' : 'hidden'}`} id="register" >
      <form
        role="form" method="POST" onSubmit={(e) => {
          e.preventDefault();
          if (username.value.trim().length < 4) {
            props.setErrorMessage('Username should be min 4 characters.');
            return;
          }
          if (password.value.trim().length < 6) {
            props.setErrorMessage('Password should be min 6 characters.');
            return;
          }
          props.sendRegister(username.value, password.value);
          username.value = '';
          password.value = '';
        }}
      >
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
  open: PropTypes.bool,
  error: PropTypes.string,
  setErrorMessage: PropTypes.func.isRequired,
  sendRegister: PropTypes.func.isRequired,
  onOpenLoginClick: PropTypes.func.isRequired,
};

Register.defaultProps = {
  error: undefined,
  open: false,
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Register);