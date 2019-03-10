// @flow

import React from "react";

import Button from "../common/Button";
import Dropdown from "./Dropdown";

const LogOut = (props: {
                  onLogoutClick: () => void,
                }) => (
                  <Dropdown small={true}>
                    <Button data-cy="log-out" green={true} onClick={props.onLogoutClick}>Log Out</Button>
                  </Dropdown>
);

export default LogOut;
