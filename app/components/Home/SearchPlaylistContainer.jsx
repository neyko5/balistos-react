import SearchPlaylistResult from './SearchPlaylistResult'
import axios from 'axios';
import { connect } from 'react-redux';
import { searchPlaylists } from '../../actions'


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        playlist_results: state.playlist.playlist_results
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSearchInputChange: (e) => {
            dispatch(searchPlaylists(e.target.value, ownProps.token));
        }
    }
}

var SearchPlaylistContainer = React.createClass({
    getInitialState: function(){
        return {
            results: []
        }
    },
    render: function() {
        return (
            <div className="search_playlist">
                <div className="inner">
                    <input type="text" id="search_playlist" placeholder="Search playlist" onChange={this.props.onSearchInputChange} />
                    <div className="search_icon"></div>
                    {this.props.playlist_results.length ?
                        <ul className="results playlist_results" id="response-playlist">
                            {this.props.playlist_results.map(function (result) {
                                return <SearchPlaylistResult key={result.uri} uri={result.uri} title={result.title}
                                                             description={result.description}/>
                            })}
                        </ul> : null }
                </div>
            </div>
        )
    }
});

module.exports = connect( mapStateToProps, mapDispatchToProps )(SearchPlaylistContainer)
