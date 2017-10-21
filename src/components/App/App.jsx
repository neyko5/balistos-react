import React from 'react';
import PropTypes from 'prop-types';
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

const App = props => (
  <BrowserRouter>
    <FullHeight onClick={props.clickOutside}>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/playlist/:playlistId" component={Playlist} />
    </FullHeight>
  </BrowserRouter>
);

App.propTypes = {
  clickOutside: PropTypes.func.isRequired,
};

export default connect(undefined, mapDispatchToProps)(App);

