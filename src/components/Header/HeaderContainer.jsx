import React from 'react';
import { Link } from 'react-router';

const HeaderContainer = props => (
  <header>
    <div className="container">
      <Link to="/">
        <h1 className="logo" >Balistos</h1>
      </Link>
      {props.children}
    </div>
    <div className="clearfix" />
  </header>
    );

HeaderContainer.propTypes = {
  children: React.PropTypes.element.isRequired,
};

module.exports = HeaderContainer;
