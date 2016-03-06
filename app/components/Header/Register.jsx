import React from 'react';
import axios from 'axios';

var Register = React.createClass({
    getInitialState: function(){
        return{
            'email':'',
            'password':'',
            'username':''
        }
        
    },
    handleEmailChange: function(e) {
       this.setState({email: e.target.value});
    },
    handlePasswordChange: function(e) {
       this.setState({password: e.target.value});
    },
    handleUsernameChange: function(e) {
       this.setState({username: e.target.value});
    },
    handleSubmit: function(e){
        axios.post('http://localhost/register', {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password
          })
          .then(function (response) {
                console.log(response);
          })
          .catch(function (response) {
                console.log(response);
          });

        e.preventDefault();
    },
  render: function() {
    return (	
		<div className={"dropdown " + (this.props.show ? '':'hidden')}  id="register" >
            <form role="form" method="POST" id="register-form" onSubmit={this.handleSubmit}>
                <label>
                    <div className="title">Username</div>
                    <div className="error" id="registration-username-error"></div>
                    <input type="text" id="register-name" name="name" value={this.state.username} onChange={this.handleUsernameChange} />
                </label>
                <label>
                    <div className="title">Email address</div>
                    <div className="error" id="registration-email-error"></div>
                    <input type="text" id="register-email" name="email" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <label>
                    <div className="title">Password</div>
                    <div className="error" id="registration-password-error"></div>
                    <input type="password" id="register-password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
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