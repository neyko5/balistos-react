import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from '../Home/Home';
import Playlist from '../Main/Playlist';
import Header from '../Header/Header';

import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="full-height">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/playlist/:playlistId" component={Playlist} />
    </div>
  </BrowserRouter>
);


export default App;

