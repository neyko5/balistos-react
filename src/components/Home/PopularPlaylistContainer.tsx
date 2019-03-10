// @flow

import { Box, Flex } from "grid-styled";
import React from "react";
import { connect } from "react-redux";

import { fetchPopularPlaylists } from "../../actions";
import PopularPlaylist from "./PopularPlaylist";

import { Dispatch } from "redux";
import { PlaylistType } from "../../types";

function mapStateToProps(state: any) {
  return {
    playlists: state.results.popular,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPopularPlaylists: () => {
    dispatch(fetchPopularPlaylists());
  },
});

interface Props {
  fetchPopularPlaylists: () => void;
  playlists: PlaylistType[];
}

interface State {
}

class PopularPlaylistContainer extends React.Component<Props, State> {
  public componentWillMount() {
    this.props.fetchPopularPlaylists();
  }
  public render() {
    return (
      <Flex flexWrap={"wrap"}>
        <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
          {this.props.playlists
            .filter((playlist, index) => index < this.props.playlists.length / 2)
            .map((result, index) =>
              <PopularPlaylist data={result} index={index} key={result.id} />)}
        </Box>
        <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
          {this.props.playlists
            .filter((playlist, index) => index >= this.props.playlists.length / 2)
            .map((result, index) => (<PopularPlaylist
              data={result}
              index={Math.ceil(this.props.playlists.length / 2) + index}
              key={result.id}
            />))}
        </Box>
      </Flex>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularPlaylistContainer);
