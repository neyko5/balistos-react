import { connect } from 'react-redux'
import { searchYoutube, addItem } from '../../actions'
import VideoResult from './VideoResult';


const mapDispatchToProps = (dispatch) => {
    return {
        searchYoutube: (e) => {
            dispatch(searchYoutube(e.currentTarget.value));
        },
        addItem: (id) => {
            dispatch(addItem(id));
        },
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        results: state.playlist.results
    }
}

var SearchVideo = React.createClass({
    render: function() {
        return (
            <div className="search">
                <input type="text" name="search" id="search" placeholder="search video" onChange={this.props.searchYoutube} autoComplete="off" />
                {this.props.results.length? <ul className="results" id="response">
                    {this.props.results.map(function(result){
                        return <VideoResult title={result.snippet.title} image={result.snippet.thumbnails.default.url}  onItemClick={this.props.addItem} id={result.id.videoId} key={result.id.videoId} />
                    }.bind(this))}
                </ul> : null }

            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchVideo);
