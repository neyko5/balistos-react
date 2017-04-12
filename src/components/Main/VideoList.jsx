import React from 'react';
import PropTypes from 'prop-types';
import VideoListItem from './VideoListItem';

const VideoList = (props) => {
  if (props.videos.empty) {
    return <div className="empty_item" >Playlist is empty. Please search and add a video.</div>;
  }

  return (
    <div className="video-list">
      {props.videos.sort((a, b) => {
        const diff = b.likes.reduce((total, like) => total + like.value, 0) -
          a.likes.reduce((total, like) => total + like.value, 0);
        return diff === 0 ? a.id - b.id : diff;
      }).map((video, index) => <VideoListItem video={video} key={video.id} index={index} />)}
    </div>
  );
};

VideoList.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.shape({
        videoId: PropTypes.string.isRequired,
      }).isRequired,
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
};

module.exports = VideoList;
