// @flow

import React from 'react';

import Button from '../common/Button';
import Dropdown from './Dropdown';
import { firebase } from '../../config/firebase';

const LogOut = () => {
    function logout() {
        firebase.auth().signOut();
    }
    return (
        <Dropdown small={true}>
            <Button data-cy="log-out" green={true} onClick={logout}>
                Log Out
            </Button>
        </Dropdown>
    );
};

export default LogOut;
