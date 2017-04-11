import React from 'react';
import PropTypes from 'prop-types';
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
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
};

module.exports = HeaderContainer;
