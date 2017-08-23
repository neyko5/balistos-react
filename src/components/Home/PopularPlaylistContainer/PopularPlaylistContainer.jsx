import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PopularPlaylist from '../PopularPlaylist';
import { fetchPopularPlaylists } from '../../../actions';

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
      <div>
        <div className="col-lg-6 col-md-6" >
          {this.props.playlists
            .filter((playlist, index) => index < this.props.playlists.length / 2)
            .map((result, index) =>
              <PopularPlaylist data={result} index={index} key={result.id} />)}
        </div>
        <div className="col-lg-6 col-md-6" >
          {this.props.playlists
            .filter((playlist, index) => index >= this.props.playlists.length / 2)
            .map((result, index) => (<PopularPlaylist
              data={result}
              index={Math.ceil(this.props.playlists.length / 2) + index}
              key={result.id}
            />))}
        </div>
      </div>
    );
  }
}

PopularPlaylistContainer.propTypes = {
  fetchPopularPlaylists: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularPlaylistContainer);
