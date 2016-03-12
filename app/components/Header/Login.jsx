var React = require('react');
import { connect } from 'react-redux'
import { sendLoginRequest } from '../../actions'

let Login = ({ dispatch, open }) => {
    let username
    let password 
    return (
        <div className={"dropdown "+ (open?"":"hidden")} id="login" >
            <form role="form" id="login-form" onSubmit={e => {
                e.preventDefault()
                if (!username.value.trim() || !password.value.trim) {
                  return
                }
                dispatch(sendLoginRequest(username.value, password.value))
                username.value = ''
                password.value = ''
              }}>
                <label>
                    <div className="title">Username</div>
                    <div className="error" id="login-username-error"></div>
                    <input type="text" ref={node => { username = node }} />
                </label>
                <label>
                    <div className="title" >Password</div>
                    <div className="forgot">Forgot password?</div>
                    <input type="password" id="login-password" name="login-password"  ref={node => { password = node }} />
                </label>
                <button type="submit" className="button green">Log In</button>
                <div className="noaccount">No account yet? <span className="link open-register">Create one now!</span>
                </div>
            </form>
            <div className="social">
                <h2>Login with:</h2>
                <a className="google-login" href=""></a>
                <a className="facebook-login" href=""></a>
            </div>
        </div>
    );
};

module.exports = Login;
