import React from 'react';
import PropTypes from 'prop-types';

const VideoResult = props => (
  <button onClick={props.onItemClick} className={props.active ? 'active' : ''}>
    <img src={props.image} alt={props.title} />
    <div className="title">{props.title}</div>
  </button>
);

VideoResult.propTypes = {
  active: PropTypes.bool.isRequired,
  onItemClick: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default VideoResult;
