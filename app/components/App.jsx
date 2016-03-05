import React from 'react';
import Header from './Header';
import Home from './Home';
import Footer from './Footer';

var App = React.createClass({
  render: function() {
    return (
    	<div className="full-height">
	    	<Header />
	    	<Home />
	    	<Footer />
	    </div>	
    );	
  }
});

module.exports = App;
