import React from 'react';

const LogOut = props => (
  <div className={`dropdown small ${props.open ? '' : 'hidden'}`} id="logout" >
    <button className="button green logout" onClick={props.onLogoutClick} >Log Out</button>
  </div>
    );

LogOut.propTypes = {
  open: React.PropTypes.boolean.isRequired,
  onLogoutClick: React.PropTypes.function.isRequired,
};

module.exports = LogOut;
