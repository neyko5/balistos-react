import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchYoutube, addVideo, updateSearchIndex, clearYoutubeResults, resetYoutubeSearchQuery } from '../../../actions';
import VideoResult from '../VideoResult';

import './SearchVideo.css';


const mapDispatchToProps = dispatch => ({
  searchYoutube: (e) => {
    dispatch(searchYoutube(e.currentTarget.value));
  },
  addVideo: (id, title, playlistId) => {
    dispatch(addVideo(id, title, playlistId));
  },
  updateSearchIndex: (value) => {
    dispatch(updateSearchIndex(value));
  },
  clearYoutubeResults: () => {
    dispatch(clearYoutubeResults());
  },
  resetYoutubeSearchQuery: () => {
    dispatch(resetYoutubeSearchQuery());
  },
});

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  results: state.results.youtube,
  query: state.results.query,
  index: state.results.youtubeIndex,
});

class SearchVideo extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyEvent, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyEvent, false);
  }
  handleKeyEvent($event) {
    let index;
    switch ($event.key) {
      case 'ArrowUp':
        this.props.updateSearchIndex(-1);
        break;
      case 'ArrowDown':
        this.props.updateSearchIndex(1);
        break;
      case 'Enter':
        index = this.props.index < 0 ? ((5 + this.props.index) % 5) : this.props.index % 5;
        if (this.props.results[index]) {
          this.props.addVideo(
            this.props.results[index].id.videoId,
            this.props.results[index].snippet.title, this.props.id);
        }
        break;
      case 'Escape':
        this.props.clearYoutubeResults();
        this.props.resetYoutubeSearchQuery();
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div className="search">
        <input
          type="text"
          id="search"
          placeholder="Search for YouTube video and add to playlist"
          onChange={this.props.searchYoutube}
          value={this.props.query || ''}
          autoComplete="off"
        />
        {this.props.results && this.props.query ? <div className="results">
          {this.props.results.map((result, index) =>
            (<VideoResult
              title={result.snippet.title}
              image={result.snippet.thumbnails.default.url}
              onItemClick={() => this.props.addVideo(result.id.videoId,
                result.snippet.title, this.props.id)}
              id={result.id.videoId}
              key={result.id.videoId}
              active={index === this.props.index % 5 || index === ((5 + this.props.index) % 5)}
            />),
          )}
        </div> : undefined }
      </div>
    );
  }
}

SearchVideo.propTypes = {
  query: PropTypes.string,
  addVideo: PropTypes.func.isRequired,
  searchYoutube: PropTypes.func.isRequired,
  updateSearchIndex: PropTypes.func.isRequired,
  resetYoutubeSearchQuery: PropTypes.func.isRequired,
  clearYoutubeResults: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      snippet: PropTypes.object.isRequired,
      id: PropTypes.object.isRequired,
    }),
  ).isRequired,
};

SearchVideo.defaultProps = {
  query: '',
  id: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchVideo);
