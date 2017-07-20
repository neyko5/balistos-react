import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchPlaylistResult = props => (
  <Link to={`/playlist/${props.result.id}`}>
    <div className="title">{props.result.title}</div>
    <div className="description">{props.result.description}</div>
  </Link>
);

SearchPlaylistResult.propTypes = {
  result: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchPlaylistResult;
