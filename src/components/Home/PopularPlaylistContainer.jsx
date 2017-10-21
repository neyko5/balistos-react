import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';

import PopularPlaylist from './PopularPlaylist';
import { fetchPopularPlaylists } from '../../actions';

function mapStateToProps(state) {
  return {
    playlists: state.results.popular,
  };
}

const mapDispatchToProps = dispatch => ({
  fetchPopularPlaylists: () => {
    dispatch(fetchPopularPlaylists());
  },
});

class PopularPlaylistContainer extends React.Component {
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

PopularPlaylistContainer.propTypes = {
  fetchPopularPlaylists: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularPlaylistContainer);
