import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendLoginRequest, toggleRegisterWindow } from '../../../actions';

const mapDispatchToProps = dispatch => ({
  sendLogin: (username, password) => {
    dispatch(sendLoginRequest(username, password));
  },
  onOpenRegisterClick: () => {
    dispatch(toggleRegisterWindow());
  },
});
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  error: state.auth.login_error,
});

const Login = (props) => {
  let username;
  let password;
  return (
    <div className={`dropdown ${props.open ? '' : 'hidden'}`} id="login" >
      <form
        role="form" id="login-form" onSubmit={(e) => {
          e.preventDefault();
          if (!username.value.trim() || !password.value.trim) {
            return;
          }
          props.sendLogin(username.value, password.value);
          username.value = '';
          password.value = '';
        }}
      >
        <label htmlFor="login-username">
          <div className="title">Username</div>
          <div className="error">{props.error}</div>
          <input type="text" name="login-username" ref={(node) => { username = node; }} />
        </label>
        <label htmlFor="password">
          <div className="title" >Password</div>
          <input
            type="password" id="login-password" name="login-password"
            ref={(node) => { password = node; }}
          />
        </label>
        <button type="submit" className="button green">Log In</button>
        <div className="noaccount">No account yet?
            <button
              className="link open-register"
              onClick={props.onOpenRegisterClick}
            >Create one now!</button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  open: PropTypes.bool.isRequired,
  error: PropTypes.string,
  sendLogin: PropTypes.func.isRequired,
  onOpenRegisterClick: PropTypes.func.isRequired,
};

Login.defaultProps = {
  error: undefined,
};


module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);
