// @flow

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Home from '../Home/Home';
import Playlist from '../Main/Playlist';
import Header from '../Header/Header';
import { closeAllWindows } from '../../actions';

import './App.css';

const mapDispatchToProps = dispatch => ({
  clickOutside: () => {
    dispatch(closeAllWindows());
  },
});

const FullHeight = styled.div`
  height: 100%;
`;

const App = (props: {
  clickOutside: () => void
}) => (
  <BrowserRouter>
    <FullHeight onClick={props.clickOutside}>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/playlist/:playlistId" component={Playlist} />
    </FullHeight>
  </BrowserRouter>
);

export default connect(undefined, mapDispatchToProps)(App);

