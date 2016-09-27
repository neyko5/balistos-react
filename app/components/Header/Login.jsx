import { connect } from 'react-redux'
import { sendLoginRequest, toggleRegisterWindow, setRegisterError } from '../../actions'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendLogin: (username, password) => {
            dispatch(sendLoginRequest(username, password))
        },
        onOpenRegisterClick: () => {
            dispatch(toggleRegisterWindow());
        },
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        error: state.auth.login_error,
    }
}

var Login = React.createClass({
    render: function(){
      let username
      let password
      return (
          <div className={"dropdown "+ (this.props.open?"":"hidden")} id="login" >
              <form role="form" id="login-form" onSubmit={e => {
                  e.preventDefault()
                  if (!username.value.trim() || !password.value.trim) {
                    return
                  }
                  this.props.sendLogin(username.value, password.value);
                  username.value = ''
                  password.value = ''
                }}>
                  <label>
                      <div className="title">Username</div>
                      <div className="error">{this.props.error}</div>
                      <input type="text" ref={node => { username = node }} />
                  </label>
                  <label>
                      <div className="title" >Password</div>
                      <input type="password" id="login-password" name="login-password"  ref={node => { password = node }} />
                  </label>
                  <button type="submit" className="button green">Log In</button>
                  <div className="noaccount">No account yet? <span className="link open-register" onClick={this.props.onOpenRegisterClick}>Create one now!</span>
                  </div>
              </form>
              <div className="social">
                  <h2>Login with:</h2>
                  <a className="google-login" href=""></a>
                  <a className="facebook-login" href=""></a>
              </div>
          </div>
      );
    }
});

module.exports = connect( mapStateToProps, mapDispatchToProps )(Login)
