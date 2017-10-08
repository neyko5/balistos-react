import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Dropdown/Dropdown';
import Button from '../../common/Button';

const LogOut = props => (
  <Dropdown small>
    <Button green onClick={props.onLogoutClick}>Log Out</Button>
  </Dropdown>
);

LogOut.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
};

export default LogOut;
