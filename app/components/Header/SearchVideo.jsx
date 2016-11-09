import { connect } from 'react-redux'
import { searchYoutube, addVideo, updateSearchIndex, clearYoutubeResults, resetYoutubeSearchQuery } from '../../actions'
import VideoResult from './VideoResult';


const mapDispatchToProps = (dispatch) => {
    return {
        searchYoutube: (e) => {
            dispatch(searchYoutube(e.currentTarget.value));
        },
        addVideo: (id, title, playlist_id) => {
            dispatch(addVideo(id, title, playlist_id));
        },
        updateSearchIndex: (value) => {
            dispatch(updateSearchIndex(value));
        },
        clearYoutubeResults: (e) => {
            dispatch(clearYoutubeResults());
        },
        resetYoutubeSearchQuery: (e) => {
            dispatch(resetYoutubeSearchQuery());
        },
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        results: state.results.youtube,
        query: state.results.query,
        index: state.results.youtube_index
    }
}

var SearchVideo = React.createClass({
    componentDidMount: function(){
        document.addEventListener("keyup", this.handleKeyEvent, false);
    },
    componentWillUnmount(){
        document.removeEventListener("keyup", this.handleKeyEvent, false);
    },
    handleKeyEvent: function($event){
        switch($event.key){
            case "ArrowUp":
                this.props.updateSearchIndex(-1);
                break;
            case "ArrowDown":
                this.props.updateSearchIndex(1);
                break;
            case "Enter":
                let index = this.props.index < 0 ? (5 + this.props.index%5) : this.props.index%5;
                this.props.results[index] && this.props.addVideo(this.props.results[index].id.videoId, this.props.results[index].snippet.title, this.props.id);
                break;
            case "Escape":
                this.props.clearYoutubeResults();
                this.props.resetYoutubeSearchQuery();
                break;
        }
    },
    render: function() {
        return (
            <div className="search">
                <input type="text" id="search" placeholder="Search for YouTube video" onChange={this.props.searchYoutube} value={this.props.query} autoComplete="off" />
                {this.props.results&&this.props.query? <ul className="results">
                    {this.props.results.map((result, index) =>
                       <VideoResult title={result.snippet.title} image={result.snippet.thumbnails.default.url}  onItemClick={()=>this.props.addVideo(result.id.videoId, result.snippet.title, this.props.id)} id={result.id.videoId} key={result.id.videoId} active={index === this.props.index%5 || index === (5 + this.props.index%5)}/>
                    )}
                </ul> : null }
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchVideo);
