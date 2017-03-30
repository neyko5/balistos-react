import React from 'react';
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
  index: React.PropTypes.number.isRequired,
  data: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
  }).isRequired,
};


module.exports = PopularPlaylist;
