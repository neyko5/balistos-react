import React from 'react';
import Header from '../Header/Header';
import Playlist from './Playlist';

let Main = (props) => {
    return (
        <div className="full-height">
            <Header search={true} id={props.params.playlist_id} />
            <Playlist id={props.params.playlist_id} />
        </div>
    );
};

export default Main;
