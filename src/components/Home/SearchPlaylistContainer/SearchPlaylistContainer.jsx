import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchPlaylistResult from '../SearchPlaylistResult';
import { searchPlaylists } from '../../../actions';

import './SearchPlaylistContainer.css';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  results: state.results.playlists,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSearchInputChange: (e) => {
    dispatch(searchPlaylists(e.target.value, ownProps.token));
  },
});

const SearchPlaylistContainer = props => (
  <div className="search_playlist">
    <div className="inner">
      <input type="text" placeholder="Search playlist" onChange={props.onSearchInputChange} />
      <div className="search_icon" />
      <ul className="results playlist_results">
        {props.results.map(result => <SearchPlaylistResult key={result.id} result={result} />)}
      </ul>
    </div>
  </div>
);

SearchPlaylistContainer.propTypes = {
  onSearchInputChange: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }),
  ).isRequired,
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(SearchPlaylistContainer);
