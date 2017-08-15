import React from 'react';
import PropTypes from 'prop-types';

const LogOut = props => (
  <div className="dropdown small" onClick={(event) => event.stopPropagation()} >
    <button className="button green logout" onClick={props.onLogoutClick} >Log Out</button>
  </div> 
);

LogOut.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
};

export default LogOut;
