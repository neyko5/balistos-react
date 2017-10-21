import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import SearchPlaylistResult from './SearchPlaylistResult';
import { searchPlaylists } from '../../actions';
import searchIcon from '../../img/search-white.png';
import transparentImg from '../../img/transparent.png';
import Input from '../common/Input';

const SearchPlaylist = styled.div`
  max-width: 620px;
  height: 55px;
  background: url(${transparentImg});
  padding: 10px;
  border-radius: 5px;
  margin: 0px auto;
`;

const SearchPlaylistInner = styled.div`
  display: flex;
`;

const SearchIcon = styled.div`
  width: 54px;
  height: 35px;
  float: left;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: #000 url(${searchIcon}) 50% no-repeat;
  flex-shrink: 0;
`;

const SearchResults = styled.ul`
  position: absolute;
  top: 43px;
  width: 100%;
  background: #fff;
  z-index: 20;
  background: #f6f6f6;
  border: 1px solid #ccc;
  border-radius: 3px;
  float: left;
  list-style: none;
  margin: 0;
  padding: 0;
  &:empty {
    display: none;
  }
`;

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
  <SearchPlaylist>
    <SearchPlaylistInner>
      <Input
        type="text"
        placeholder="Search playlist"
        search
        onChange={props.onSearchInputChange}
      />
      <SearchIcon />
      <SearchResults>
        {props.results.map(result => <SearchPlaylistResult key={result.id} result={result} />)}
      </SearchResults>
    </SearchPlaylistInner>
  </SearchPlaylist>
);

SearchPlaylistContainer.propTypes = {
  onSearchInputChange: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlaylistContainer);
