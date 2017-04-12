import React from 'react';
import PropTypes from 'prop-types';

const LogOut = props => (
  <div className={`dropdown small ${props.open ? '' : 'hidden'}`} id="logout" >
    <button className="button green logout" onClick={props.onLogoutClick} >Log Out</button>
  </div>
    );

LogOut.propTypes = {
  open: PropTypes.bool.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
};

module.exports = LogOut;
