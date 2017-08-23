import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendLoginRequest, toggleRegisterWindow } from '../../../actions';

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
      <div className="dropdown" role="presentation" onClick={event => event.stopPropagation()}>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="login-username">
            <div className="title">Username</div>
            <div className="error">{this.props.error}</div>
            <input type="text" name="username" onChange={this.handleChange} value={this.state.username} />
          </label>
          <label htmlFor="password">
            <div className="title" >Password</div>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
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
