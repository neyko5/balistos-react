import React from 'react';
import styled from 'styled-components';
import googleButton from '../../img/btn_google_signin_normal.png';
import facebookButton from '../../img/btn_facebook_login.png';
import Dropdown from './Dropdown';
import { firebase } from '../../config/firebase';

const OauthButton = styled.img`
    height: 50px;
`;

const ErrorMessage = styled.div`
    font-size: 11px;
    line-height: 24px;
    color: #ff4f00;
`;

const Login = () => {
    const [errorMessage, setErrorMessage] = React.useState('');
    function loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .catch((error) => {
                setErrorMessage(error.message);
            });
    }

    function loginWithFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .catch((error) => {
                setErrorMessage(error.message);
            });
    }

    return (
        <Dropdown>
            <button type="button" onClick={loginWithGoogle}>
                <OauthButton src={googleButton} />
            </button>
            <button type="button" onClick={loginWithFacebook}>
                <OauthButton src={facebookButton} />
            </button>
            <ErrorMessage>{errorMessage}</ErrorMessage>
        </Dropdown>
    );
};

export default Login;
