import { Flex } from 'grid-styled';
import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import PopularPlaylist from './PopularPlaylist';
import { PlaylistType } from '../../types';

interface Props {
    playlists: PlaylistType[];
}

const PopularPlaylistContainer: React.FC<Props> = (props: Props) => {
    return (
        <Flex flexWrap={'wrap'}>
            {props.playlists.map((result: PlaylistType, index: number) => (
                <PopularPlaylist {...result} index={index} key={result.id} />
            ))}
        </Flex>
    );
};

export default compose(
    firestoreConnect(() => ['playlists']),
    connect((state: any) => ({
        playlists: state.firestore.ordered.playlists || [],
    }))
)(PopularPlaylistContainer) as React.ComponentType;
