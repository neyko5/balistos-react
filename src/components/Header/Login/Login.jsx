import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendLoginRequest, toggleRegisterWindow, toggleLoginWindow } from '../../../actions';

const mapDispatchToProps = dispatch => ({
  onOpenRegisterClick: () => {
    dispatch(toggleRegisterWindow());
  },
  onCloseLoginWindow: () => {
    dispatch(toggleLoginWindow());
  },
  onSubmit: (e, username, password) => {
    e.preventDefault();
    if (!username.value.trim() || !password.value.trim()) {
      return;
    }
    dispatch(sendLoginRequest(username.value, password.value));
    username.value = '';
    password.value = '';
  }
});
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  error: state.auth.loginError,
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClickEvent = this.handleClickEvent.bind(this);
  }
  componentWillMount() {
    document.addEventListener('click', this.handleClickEvent, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickEvent, false);
  }
  handleClickEvent($event) {
    if (!ReactDOM.findDOMNode(this).contains($event.target)) {
      this.props.onCloseLoginWindow();
    }
  }
  render() {
    let username;
    let password;
    return (
      <div className="dropdown">
        <form onSubmit={(e) => this.props.onSubmit(e, username, password)}>
          <label htmlFor="login-username">
            <div className="title">Username</div>
            <div className="error">{this.props.error}</div>
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
              className="link"
              onClick={this.props.onOpenRegisterClick}
            >Create one now!</button>
          </div>
        </form>
      </div>
    );
  }
};

Login.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onOpenRegisterClick: PropTypes.func.isRequired,
};

Login.defaultProps = {
  error: undefined,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
