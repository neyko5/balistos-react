// @flow

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import SearchPlaylistResult from './SearchPlaylistResult';
import { searchPlaylists } from '../../actions';
import searchIcon from '../../img/search-white.png';
import transparentImg from '../../img/transparent.png';
import Input from '../common/Input';
import type { PlaylistType } from '../../types/index';

const SearchPlaylist = styled.div`
  max-width: 620px;
  height: 55px;
  background: url(${transparentImg});
  padding: 10px;
  border-radius: 5px;
  margin: 0px auto;
  position: relative;
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
  top: 45px;
  width: calc(100% - 20px);
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

const mapDispatchToProps = (dispatch: any) => ({
  onSearchInputChange: (e) => {
    dispatch(searchPlaylists(e.target.value));
  },
});

type Props = {
  onSearchInputChange: (Event) => void,
  results: Array<PlaylistType>,
}

type State = {
  query: string,
}

class SearchPlaylistContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  handleQueryChange: Function;
  handleQueryChange(event) {
    this.setState({
      query: event.target.value,
    });
    this.props.onSearchInputChange(event);
  }

  render() {
    return (
      <SearchPlaylist>
        <SearchPlaylistInner>
          <Input
            type="text"
            placeholder="Search playlist"
            search
            name="query"
            onChange={this.handleQueryChange}
            value={this.state.query}
          />
          <SearchIcon />
          <SearchResults>
            {this.props.results.map(result =>
              <SearchPlaylistResult key={result.id} result={result} />)}
          </SearchResults>
        </SearchPlaylistInner>
      </SearchPlaylist>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlaylistContainer);
