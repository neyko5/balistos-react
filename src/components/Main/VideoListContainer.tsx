// @flow

import React from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';

import VideoList from './VideoList';
import SearchVideo from './SearchVideo';

import { PlaylistType } from '../../types';

const PlaylistBox = styled.div`
  background: #e1e1e1;
  border-top: 0;
  float: left;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const PlaylistBody = styled.div`
  float: left;
  width: 100%;
  height: 400px;
  overflow: auto;
`;


const VideoListContainer = (props: {
  playlist: PlaylistType
}) => (
  <Box width={[1, 1, 1 / 2, 1 / 2]}>
    <PlaylistBox>
      <SearchVideo id={props.playlist.id} />
      <PlaylistBody>
        <VideoList
          current={props.playlist.current}
          videos={props.playlist.videos}
        />
      </PlaylistBody>
    </PlaylistBox>
  </Box>
);

export default VideoListContainer;
