import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../Home/Home';
import Playlist from '../Main/Playlist';
import Header from '../Header/Header';
import { closeAllWindows } from '../../actions';

import './App.css';

const mapDispatchToProps = (dispatch) => ({
  clickOutside: () => {
    dispatch(closeAllWindows());
  },
});

const App = (props) => (
  <BrowserRouter>
    <div className="full-height" onClick={props.clickOutside}>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/playlist/:playlistId" component={Playlist} />
    </div>
  </BrowserRouter>
);

export default connect(undefined, mapDispatchToProps)(App);

