import { Box } from 'grid-styled';
import React from 'react';
import styled from 'styled-components';
import SearchVideo from './SearchVideo';
import VideoList from './VideoList';

const PlaylistBox = styled.div`
    background: #e1e1e1;
    border-top: 0;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
`;

const PlaylistBody = styled.div`
    width: 100%;
    height: 400px;
    overflow: auto;
`;

const VideoListContainer = (props: {
    playlistId: string;
    playlist: any;
    videos: any;
}) => (
    <Box width={[1, 1, 1 / 2, 1 / 2]}>
        <PlaylistBox>
            <SearchVideo id={props.playlistId} />
            <PlaylistBody>
                <VideoList
                    id={props.playlistId}
                    current={props.playlist?.current}
                    videos={props.videos}
                />
            </PlaylistBody>
        </PlaylistBox>
    </Box>
);

export default VideoListContainer;
