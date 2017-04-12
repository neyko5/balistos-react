import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Playlist from './Playlist';

const Main = props => (
  <div className="full-height">
    <Header />
    <Playlist id={props.match.params.playlist_id} />
  </div>
    );

Main.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      playlist_id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Main;
