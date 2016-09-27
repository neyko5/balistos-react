import { connect } from 'react-redux'
import { sendRegisterRequest, toggleLoginWindow, setRegisterError } from '../../actions'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendRegister: (username, email, password) => {
            dispatch(sendRegisterRequest(username, email, password))
        },
        setErrorMessage: (message) => {
            dispatch(setRegisterError(message));
        },
        onOpenLoginClick: () => {
            dispatch(toggleLoginWindow());
        },
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        error: state.auth.register_error,
    }
}

var Register = React.createClass({
    render: function() {
        let username
        let password
        return (
            <div className={"dropdown " + (this.props.open? '':'hidden')}  id="register" >
                <form role="form" method="POST" onSubmit={e => {
                    e.preventDefault()
                    if (username.value.trim().length < 4) {
                        this.props.setErrorMessage("Username should be min 4 characters.");
                        return;
                    }
                    if (password.value.trim().length < 6) {
                        this.props.setErrorMessage("Password should be min 6 characters.");
                        return;
                    }
                    this.props.sendRegister(username.value, password.value);
                    username.value = ''
                    password.value = ''
                  }}>
                    <label>
                        <div className="title">Username</div>
                        <div className="error">{this.props.error}</div>
                        <input type="text" ref={node => { username = node }} />
                    </label>
                    <label>
                        <div className="title">Password</div>
                        <input type="password" ref={node => { password = node }} />
                    </label>
                    <button className="button green" type="submit">Register</button>
                    <div className="noaccount">Already have an account? <span className="link open-login" onClick={this.props.onOpenLoginClick}>Log in now!</span>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Register)
