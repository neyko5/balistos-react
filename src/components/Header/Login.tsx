import React from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import { firebase } from '../../config/firebase';
import { ReactComponent as Google } from '../../img/google.svg';
import { ReactComponent as Facebook } from '../../img/facebook.svg';
import Button from '../common/Button';

const ErrorMessage = styled.div`
    font-size: 11px;
    line-height: 24px;
    color: #ff4f00;
`;

const ButtonText = styled.span`
    vertical-align: top;
    font-size: 16px;
    font-weight: 500;
    margin-left: 10px;
`;

const FacebookIcon = styled(Facebook)`
    height: 24px;
    width: 24px;
    margin: 6px 0px;
`;

const GoogleIcon = styled(Google)`
    height: 24px;
    width: 24px;
    margin: 6px 0px;
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
        <Dropdown width={232}>
            <Button
                color="google"
                fullWidth={true}
                type="button"
                onClick={loginWithGoogle}
            >
                <GoogleIcon />
                <ButtonText>Login with Google</ButtonText>
            </Button>
            <Button
                color="facebook"
                fullWidth={true}
                type="button"
                onClick={loginWithFacebook}
            >
                <FacebookIcon />
                <ButtonText>Login with Facebook</ButtonText>
            </Button>
            <ErrorMessage>{errorMessage}</ErrorMessage>
        </Dropdown>
    );
};

export default Login;
