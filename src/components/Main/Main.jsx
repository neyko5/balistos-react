import React from 'react';
import Header from '../Header/Header';
import Playlist from './Playlist';

const Main = props => (
  <div className="full-height">
    <Header search id={props.params.playlist_id} />
    <Playlist id={props.params.playlist_id} />
  </div>
    );

Main.propTypes = {
  params: React.PropTypes.shape({
    playlist_id: React.propTypes.string.isRequired,
  }).isRequired,
};

export default Main;
