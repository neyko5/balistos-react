import React from 'react';
import { connect } from 'react-redux';
import { searchYoutube, addVideo, updateSearchIndex, clearYoutubeResults, resetYoutubeSearchQuery } from '../../actions';
import VideoResult from './VideoResult';


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
  index: state.results.youtube_index,
});

class SearchVideo extends React.Component {
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyEvent, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyEvent, false);
  }
  handleKeyEvent($event) {
    switch ($event.key) {
      case 'ArrowUp':
        this.props.updateSearchIndex(-1);
        break;
      case 'ArrowDown':
        this.props.updateSearchIndex(1);
        break;
      case 'Enter':
        const index = this.props.index < 0 ? (5 + this.props.index % 5) : this.props.index % 5;
        this.props.results[index] && this.props.addVideo(this.props.results[index].id.videoId, this.props.results[index].snippet.title, this.props.id);
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
        <input type="text" id="search" placeholder="Search for YouTube video" onChange={this.props.searchYoutube} value={this.props.query || ''} autoComplete="off" />
        {this.props.results && this.props.query ? <ul className="results">
          {this.props.results.map((result, index) =>
            <VideoResult title={result.snippet.title} image={result.snippet.thumbnails.default.url} onItemClick={() => this.props.addVideo(result.id.videoId, result.snippet.title, this.props.id)} id={result.id.videoId} key={result.id.videoId} active={index === this.props.index % 5 || index === (5 + this.props.index % 5)} />,
                    )}
        </ul> : null }
      </div>
    );
  },
};

SearchVideo.propTypes = {
  query: React.PropTypes.string.isRequired,
  addVideo: React.PropTypes.function.isRequired,
  searchYoutube: React.PropTypes.function.isRequired,
  updateSearchIndex: React.PropTypes.function.isRequired,
  resetYoutubeSearchQuery: React.PropTypes.function.isRequired,
  clearYoutubeResults: React.PropTypes.function.isRequired,
  index: React.PropTypes.number.isRequired,
  id: React.PropTypes.string.isRequired,
  results: React.propTypes.arrayof(
      React.PropTypes.shape({
        snippet: React.PropTypes.element.isRequired,
        id: React.PropTypes.element.isRequired,
        username: React.PropTypes.element.isRequired,
      }),
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchVideo);
