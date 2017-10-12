import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import VideoListItem from './VideoListItem';

const EmptyItem = styled.div`
  color: #3E414C;
  padding: 10px;
`

const List = styled.div`
  width: 100%;
`

const VideoList = (props) => {
  if (props.videos.empty) {
    return <EmptyItem>Playlist is empty. Please search and add a video.</EmptyItem>;
  }

  return (
    <List>
      {props.current ? <VideoListItem
        video={props.current}
        key={props.current.id}
        index={0}
      /> : undefined }
      {props.videos.sort((a, b) => {
        const diff = b.likes.reduce((total, like) => total + like.value, 0) -
          a.likes.reduce((total, like) => total + like.value, 0);
        return diff === 0 ? a.id - b.id : diff;
      }).map((video, index) => <VideoListItem video={video} key={video.id} index={index + 1} />)}
    </List>
  );
};

VideoList.propTypes = {
  current: PropTypes.shape({
    id: PropTypes.number.isRequired,
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
      }),
    ).isRequired,
  }),
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      likes: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.number,
        }),
      ).isRequired,
    }),
  ),
};

VideoList.defaultProps = {
  videos: [],
  current: undefined,
};

export default VideoList;
