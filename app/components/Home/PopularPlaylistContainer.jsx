var PopularPlaylist = require('./PopularPlaylist');
import { connect } from 'react-redux';
import { fetchPopularPlaylists } from '../../actions'

//const socket = io('http://localhost:4000');

function mapStateToProps(state) {
    return {
        playlists: state.results.popular
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPopularPlaylists: (message) => {
            dispatch(fetchPopularPlaylists());
        }
    }
}

var PopularPlaylistContainer = React.createClass({
    componentWillMount: function(){
      this.props.fetchPopularPlaylists();
    },
    render: function() {
        return (
            <div>
                <div className="col-lg-6 col-md-6" >
                    {this.props.playlists.filter((playlist, index) => index < this.props.playlists.length/2).map(function(result, index) {
                      return <PopularPlaylist data={result} index={index} key={index}/>;
                    })}
                </div>
                <div className="col-lg-6 col-md-6" >
                    {this.props.playlists.filter((playlist, index) => index >= this.props.playlists.length/2).map((result, index) => {
                      return <PopularPlaylist data={result} index={Math.ceil(this.props.playlists.length/2) + index} key={index}/>;
                    })}
                </div>
            </div>
        );
    }
});

module.exports = connect( mapStateToProps, mapDispatchToProps )(PopularPlaylistContainer)
