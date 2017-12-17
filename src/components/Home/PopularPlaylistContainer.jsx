// @flow

import React from 'react';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';

import PopularPlaylist from './PopularPlaylist';
import { fetchPopularPlaylists } from '../../actions';

import type { PlaylistType } from '../../types';

function mapStateToProps(state: any) {
  return {
    playlists: state.results.popular,
  };
}

const mapDispatchToProps = dispatch => ({
  fetchPopularPlaylists: () => {
    dispatch(fetchPopularPlaylists());
  },
});

type Props = {
  fetchPopularPlaylists: () => void,
  playlists: Array<PlaylistType>,
}

type State = {
}

class PopularPlaylistContainer extends React.Component<Props, State> {
  componentWillMount() {
    this.props.fetchPopularPlaylists();
  }
  render() {
    return (
      <Flex wrap>
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
