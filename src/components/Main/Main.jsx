import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Playlist from './Playlist';

const Main = props => (
  <div className="full-height">
    <Header search id={props.params.playlist_id} />
    <Playlist id={props.params.playlist_id} />
  </div>
    );

Main.propTypes = {
  params: PropTypes.shape({
    playlist_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Main;
