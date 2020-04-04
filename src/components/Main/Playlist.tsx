import { Flex } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Container from '../common/Container';
import ChatContainer from './ChatContainer';
import RelatedVideos from './RelatedVideos';
import VideoListContainer from './VideoListContainer';
import VideoPlayer from './VideoPlayer';

import { compose } from 'redux';

import { firestoreConnect } from 'react-redux-firebase';

import {
    PlaylistType,
    YoutubeResultVideoType,
    VideoType,
} from '../../types/index';
import { getRelatedYouTubeVideos } from '../../services/youtube.service';

const Main = styled.div`
    min-height: 100%;
    height: auto;
    margin: -50px auto -45px;
    padding: 50px 0 45px;
    @media (min-width: 992px) {
        margin-top: 0;
    }
`;

interface Props {
    playlist: PlaylistType;
    videos: VideoType[];
    related: YoutubeResultVideoType[];
    id: string;
}

const Playlist = (props: Props) => {
    const [related, setRelated] = React.useState([]);

    React.useEffect(() => {
        if (props.videos.length > 0) {
            getRelatedYouTubeVideos(props.videos[0].youtubeId).then((res) => {
                setRelated(res);
            });
        }
    }, [props.videos]);

    return (
        <Main>
            <Container>
                <Flex flexWrap={'wrap'}>
                    <VideoPlayer
                        playlistTitle={props.playlist?.title}
                        playlistUsername={props.playlist?.creator?.name}
                        current={props.videos.length > 0 && props.videos[0]}
                        id={props.id}
                    />
                    <VideoListContainer
                        playlistId={props.id}
                        playlist={props.playlist}
                        videos={props.videos}
                    />
                    <ChatContainer id={props.id} />
                    <RelatedVideos id={props.id} related={related} />
                </Flex>
            </Container>
        </Main>
    );
};

export default compose(
    firestoreConnect((state: any) => [
        {
            collection: 'playlists',
            doc: state.match.params.playlistId,
            storeAs: 'playlist',
        },
        {
            collection: `playlists/${state.match.params.playlistId}/videos`,
            storeAs: 'videos',
        },
    ]),
    connect((state: any, props: any) => ({
        playlist: state.firestore.data.playlist,
        videos: state.firestore.ordered.videos || [],
        id: props.match.params.playlistId,
    }))
)(Playlist) as React.ComponentType;
