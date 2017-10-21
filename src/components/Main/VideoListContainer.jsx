import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grid-styled';
import styled from 'styled-components';

import VideoList from './VideoList';
import SearchVideo from './SearchVideo';

const PlaylistBox = styled.div`
  background: #e1e1e1;
  border-top: 0;
  float: left;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 40px;
`

const PlaylistBody = styled.div`
  float: left;
  width: 100%;
  height: 400px;
  overflow: auto;
`


const VideoListContainer = props => (
  <Box width={[1, 1, 1/2, 1/2]}>
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

VideoListContainer.propTypes = {
  playlist: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.title,
    videos: PropTypes.arrayOf(
      PropTypes.object.isRequired,
    ).isRequired,
    current: PropTypes.object,
  }).isRequired,

};

VideoListContainer.defaultProps = {
  playlist: {
    username: undefined,
    id: undefined,
    current: undefined,
  },
};

export default VideoListContainer;
