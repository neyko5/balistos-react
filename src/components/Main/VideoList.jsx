import React from 'react';
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
      }).map(video => <VideoListItem video={video} key={video.id} />)}
    </div>
  );
};

VideoList.propTypes = {
  videos: React.propTypes.arrayof(
    React.PropTypes.shape({
      id: React.PropTypes.shape({
        videoId: React.PropTypes.videoId.isRequired,
      }).isRequired,
      likes: React.propTypes.arrayof(
        React.PropTypes.shape({
          value: React.propTypes.number,
        }),
      ).isRequired,
    }).isRequired,
  ).isRequired,
};

module.exports = VideoList;
