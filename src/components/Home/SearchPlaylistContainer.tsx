// @flow

import React, { FormEvent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { searchPlaylists } from "../../actions";
import searchIcon from "../../img/search-white.png";
import transparentImg from "../../img/transparent.png";
import { PlaylistType } from "../../types/index";
import Input from "../common/Input";
import SearchPlaylistResult from "./SearchPlaylistResult";

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

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps,
  results: state.results.playlists,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSearchInputChange: (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    dispatch(searchPlaylists(target.value));
  },
});

interface Props {
  onSearchInputChange: (event: FormEvent<HTMLInputElement>) => void;
  results: PlaylistType[];
}
interface State {
  query: string;
}
class SearchPlaylistContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: "",
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  public handleQueryChange(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    this.setState({
      query: target.value,
    });
    this.props.onSearchInputChange(event);
  }

  public render() {
    return (
      <SearchPlaylist>
        <SearchPlaylistInner>
          <Input
            type="text"
            placeholder="Search playlist"
            search={true}
            name="query"
            onChange={this.handleQueryChange}
            value={this.state.query}
          />
          <SearchIcon />
          <SearchResults data-cy="search-results">
            {this.props.results.map((result) =>
              <SearchPlaylistResult key={result.id} result={result} />)}
          </SearchResults>
        </SearchPlaylistInner>
      </SearchPlaylist>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlaylistContainer);
