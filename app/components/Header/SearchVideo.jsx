import { connect } from 'react-redux'
import { searchYoutube, addVideo } from '../../actions'
import VideoResult from './VideoResult';


const mapDispatchToProps = (dispatch) => {
    return {
        searchYoutube: (e) => {
            dispatch(searchYoutube(e.currentTarget.value));
        },
        addVideo: (id, title, playlist_id) => {
            dispatch(addVideo(id, title, playlist_id));
        },
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        results: state.results.youtube
    }
}

var SearchVideo = React.createClass({
    render: function() {
        return (
            <div className="search">
                <input type="text" id="search" placeholder="Search for YouTube video" onChange={this.props.searchYoutube} autoComplete="off" />
                {this.props.results? <ul className="results">
                    {this.props.results.map((result) =>
                       <VideoResult title={result.snippet.title} image={result.snippet.thumbnails.default.url}  onItemClick={()=>this.props.addVideo(result.id.videoId, result.snippet.title, this.props.id)} id={result.id.videoId} key={result.id.videoId} />
                    )}
                </ul> : null }

            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchVideo);
