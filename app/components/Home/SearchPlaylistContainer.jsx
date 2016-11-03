import SearchPlaylistResult from './SearchPlaylistResult'
import axios from 'axios';
import { connect } from 'react-redux';
import { searchPlaylists } from '../../actions'


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        results: state.results.playlists
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
    render: function() {
        return (
            <div className="search_playlist">
                <div className="inner">
                    <input type="text" placeholder="Search playlist" onChange={this.props.onSearchInputChange} />
                    <div className="search_icon"></div>
                    <ul className="results playlist_results">
                        {this.props.results.map(function (result) {
                            return <SearchPlaylistResult key={result.id} result={result}/>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
});

module.exports = connect( mapStateToProps, mapDispatchToProps )(SearchPlaylistContainer)
