// @flow

import React from 'react';

import Dropdown from './Dropdown';
import Button from '../common/Button';

const LogOut = (props: {
                  onLogoutClick: () => void
                }) => (
                  <Dropdown small>
                    <Button green onClick={props.onLogoutClick}>Log Out</Button>
                  </Dropdown>
);

export default LogOut;
