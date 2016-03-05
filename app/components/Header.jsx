import React from 'react';
import Link from 'react-router'

var Header = React.createClass({
  render: function() {
    return (	
    	<header>
            <div className="container">
                <h1 className="logo">Balistos</h1>
                <div className="dropdown small" id="logout" >
                    <a href="/logout" className="button green logout">Log Out</a>
                </div>
                <div className="dropdown" id="create"  >
                    <form action="/create_playlist" method="POST" id="create_playlist">
                        <label>
                            <div className="title">Title</div>
                            <div className="error" id="create-playlist-error"></div>
                            <input type="text" id="playlist-title" name="playlist-title" />
                        </label>
                        <button type="submit" className="button green">Create</button>
                    </form>
                </div>
                <div className="dropdown" id="login">
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
                <div className="dropdown" id="register" >
                    <form role="form" id="register-form">
                        <label>
                            <div className="title">Username</div>
                            <div className="error" id="registration-username-error"></div>
                            <input type="text" id="register-username" name="register-username" />
                        </label>
                        <label>
                            <div className="title">Email address</div>
                            <div className="error" id="registration-email-error"></div>
                            <input type="text" id="register-email" name="register-email" />
                        </label>
                        <label>
                            <div className="title">Password</div>
                            <div className="error" id="registration-password-error"></div>
                            <input type="password" id="register-password" name="register-password" />
                        </label>
                        <label>
                            <div className="title">Repeat password</div>
                            <div className="error" id="registration-repeat-error"></div>
                            <input type="password" id="register-repeat" name="register-repeat" />
                        </label>
                        <button className="button green" type="submit">Register</button>
                        <div className="noaccount">Already have an account? <span className="link open-login">Log in now!</span>
                        </div>
                    </form>
                </div>
            </div>
            <div className="clearfix"></div>
        </header>
    )    
  }
});

module.exports = Header;
