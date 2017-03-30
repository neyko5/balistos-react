import React from 'react';
import SearchPlaylistResult from './SearchPlaylistResult';
import { connect } from 'react-redux';
import { searchPlaylists } from '../../actions';


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
  onSearchInputChange: React.PropTypes.func.isRequired,
  results: React.propTypes.arrayof(
      React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
      }),
  ).isRequired,
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(SearchPlaylistContainer);
