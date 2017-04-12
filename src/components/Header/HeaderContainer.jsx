import React from 'react';
import { Link } from 'react-router-dom';

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


module.exports = HeaderContainer;
