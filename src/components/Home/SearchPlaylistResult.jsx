import React from 'react';
import { Link } from 'react-router';

const SearchPlaylistResult = props => (
  <Link to={`/playlist/${props.result.id}`}>
    <div className="title">{props.result.title}</div>
    <div className="description">{props.result.description}</div>
  </Link>
);

SearchPlaylistResult.propTypes = {
  result: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
  }).isRequired,
};

module.exports = SearchPlaylistResult;
