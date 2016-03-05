var React = require('react');

var Login = React.createClass({
	render: function() {
		return (
			<div className={"dropdown " + (this.props.show ? 'hidden':'')} id="login">
                <form role="form" id="login-form">
                    <label>
                        <div className="title">Username</div>
                        <div className="error" id="login-username-error"></div>
                        <input type="text" id="login-username" name="login-username" />
                    </label>
                    <label>
                        <div className="title" >Password</div>
                        <div className="forgot">Forgot password?</div>
                        <input type="password" id="login-password" name="login-password" />
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
	}

});

module.exports = Login;
