import React from 'react';
import { connect } from 'react-redux'
import { sendRegisterRequest } from '../../actions'

let Register = ({ dispatch, open }) => {
    let username
    let email
    let password
    return (
        <div className={"dropdown " + (open? '':'hidden')}  id="register" >
            <form role="form" method="POST" id="register-form"  onSubmit={e => {
                e.preventDefault()
                if (!username.value.trim() || !password.value.trim  || !email.value.trim()) {
                  return
                }
                dispatch(sendRegisterRequest(username.value, email.value, password.value))
                username.value = ''
                password.value = ''
                email.value = ''
              }}>
                <label>
                    <div className="title">Username</div>
                    <div className="error" id="registration-username-error"></div>
                    <input type="text" ref={node => { username = node }} />
                </label>
                <label>
                    <div className="title">Email address</div>
                    <div className="error" id="registration-email-error"></div>
                    <input type="text" ref={node => { email = node }} />
                </label>
                <label>
                    <div className="title">Password</div>
                    <div className="error" id="registration-password-error"></div>
                    <input type="password" ref={node => { password = node }} />
                </label>
                <button className="button green" type="submit">Register</button>
                <div className="noaccount">Already have an account? <span className="link open-login">Log in now!</span>
                </div>
            </form>
        </div>
    );
}

module.exports = Register;