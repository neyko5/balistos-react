import React from 'react';

var Register = React.createClass({
  render: function() {
    return (	
		<div className="dropdown hidden" id="register" >
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
    );
  }
});

module.exports = Register;