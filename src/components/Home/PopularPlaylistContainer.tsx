// @flow

import { Box, Flex } from 'grid-styled';
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
            <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
                {props.playlists.map((result: PlaylistType, index: number) => (
                    <PopularPlaylist
                        {...result}
                        index={index}
                        key={result.id}
                    />
                ))}
            </Box>
        </Flex>
    );
};

export default compose(
    firestoreConnect(() => ['playlists']),
    connect((state: any) => ({
        playlists: state.firestore.ordered.playlists || [],
    }))
)(PopularPlaylistContainer) as React.ComponentType;
