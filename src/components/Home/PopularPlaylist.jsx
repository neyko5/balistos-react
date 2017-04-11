import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const PopularPlaylist = props => (
  <Link to={`/playlist/${props.data.id}`} className="play-list">
    <div className="number" >{props.index + 1}</div>
    <div className="square">
      <div className="title">{props.data.title}</div>
      <div className="created">created by <span className="black">{props.data.username}</span></div>
    </div>
  </Link>
    );

PopularPlaylist.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};


module.exports = PopularPlaylist;
