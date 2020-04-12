import React from 'react';
import Button from '../common/Button';
import Dropdown from './Dropdown';
import { firebase } from '../../config/firebase';

const LogOut = () => {
    function logout() {
        return firebase.auth().signOut();
    }
    return (
        <Dropdown width={210}>
            <Button data-cy="log-out" color="green" onClick={logout}>
                Log Out
            </Button>
        </Dropdown>
    );
};

export default LogOut;
