// @flow

import React, { ChangeEvent, FormEvent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Dispatch } from "redux";
import { addVideo, clearYoutubeResults, resetYoutubeSearchQuery, searchYoutube, updateSearchIndex } from "../../actions";
import { YoutubeResultVideoType } from "../../types/index";
import VideoResult from "./VideoResult";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchYoutube: (e: FormEvent<HTMLFormElement>) => {
    dispatch(searchYoutube(e.currentTarget.value));
  },
  addVideo: (id: string, title: string, playlistId: string) => {
    dispatch(addVideo(id, title, playlistId, false));
  },
  updateSearchIndex: (value: number) => {
    dispatch(updateSearchIndex(value));
  },
  clearYoutubeResults: () => {
    dispatch(clearYoutubeResults());
  },
  resetYoutubeSearchQuery: () => {
    dispatch(resetYoutubeSearchQuery());
  },
});

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps,
  results: state.results.youtube,
  query: state.results.query,
  index: state.results.youtubeIndex,
});

const Search = styled.div`
  float: left;
  position: relative;
  width: 100%;
  padding: 5px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 0px;
  float: left;
  line-height: 18px;
  font-size: 13px;
  color: #333333;
  background-color: white;
  padding: 11px 10px;
  margin: 0px;
`;

const SearchResults = styled.div`
  position: absolute;
  top: 43px;
  width: calc(100% - 10px);
  z-index: 20;
  background: #F6F6F6;
  border: 1px solid #CCCCCC;
  border-radius: 3px;
  list-style: none;
  padding: 0px;
  text-align: left;
`;

interface Props {
  query: string;
  addVideo: (id: string, title: string, playlistId: string) => void;
  searchYoutube: (event: ChangeEvent<HTMLInputElement>) => void;
  updateSearchIndex: (index: number) => void;
  resetYoutubeSearchQuery: () => void;
  clearYoutubeResults: () => void;
  index: number;
  id: string;
  results: YoutubeResultVideoType[];
}

interface State {}

class SearchVideo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
  }
  public componentDidMount() {
    document.addEventListener("keyup", this.handleKeyEvent, false);
  }
  public componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyEvent, false);
  }

  public handleKeyEvent(event: KeyboardEvent) {
    const key = event.key;
    let index;
    switch (key) {
      case "ArrowUp":
        this.props.updateSearchIndex(-1);
        break;
      case "ArrowDown":
        this.props.updateSearchIndex(1);
        break;
      case "Enter":
        index = this.props.index < 0 ? ((5 + this.props.index) % 5) : this.props.index % 5;
        if (this.props.results[index]) {
          this.props.addVideo(
            this.props.results[index].id.videoId,
            this.props.results[index].snippet.title, this.props.id,
          );
        }
        break;
      case "Escape":
        this.props.clearYoutubeResults();
        this.props.resetYoutubeSearchQuery();
        break;
      default:
        break;
    }
  }
  public render() {
    return (
      <Search>
        <SearchInput
          type="text"
          placeholder="Search for YouTube video and add to playlist"
          onChange={this.props.searchYoutube}
          value={this.props.query || ""}
          autoComplete="off"
        />
        {this.props.results && this.props.query ?
          <SearchResults>
            {this.props.results.map((result, index) =>
              (<VideoResult
                title={result.snippet.title}
                image={result.snippet.thumbnails.default.url}
                onItemClick={() => this.props.addVideo(
                  result.id.videoId,
                  result.snippet.title, this.props.id,
                )}
                id={result.id.videoId}
                key={result.id.videoId}
                active={index === this.props.index % 5 || index === ((5 + this.props.index) % 5)}
              />))}
          </SearchResults> : undefined }
      </Search>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchVideo);
