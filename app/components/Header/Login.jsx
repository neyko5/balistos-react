var React = require('react');
import axios from 'axios';

var Login = React.createClass({
    getInitialState: function(){
        return{
            'password':'',
            'username':''
        }
        
    },
    handlePasswordChange: function(e) {
       this.setState({password: e.target.value});
    },
    handleUsernameChange: function(e) {
       this.setState({username: e.target.value});
    },
    handleSubmit: function(e){
        axios.post('http://localhost/login', {
            name: this.state.username,
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
			<div className={"dropdown " + (this.props.show ? '':'hidden')} id="login" onSubmit={this.handleSubmit}>
                <form role="form" id="login-form">
                    <label>
                        <div className="title">Username</div>
                        <div className="error" id="login-username-error"></div>
                        <input type="text" id="login-username" name="login-username" value={this.state.username} onChange={this.handleUsernameChange}  />
                    </label>
                    <label>
                        <div className="title" >Password</div>
                        <div className="forgot">Forgot password?</div>
                        <input type="password" id="login-password" name="login-password" value={this.state.password} onChange={this.handlePasswordChange}  />
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
