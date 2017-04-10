import React from 'react';

const VideoResult = props => (
  <button onClick={props.onItemClick} className={props.active ? 'active' : ''}>
    <img src={props.image} alt={props.title} />
    <div className="title">{props.title}</div>
  </button>
    );

VideoResult.propTypes = {
  active: React.PropTypes.boolean.isRequired,
  onItemClick: React.PropTypes.function.isRequired,
  image: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default VideoResult;
