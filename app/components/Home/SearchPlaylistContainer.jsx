import React from 'react';
import SearchPlaylistResult from './SearchPlaylistResult'
import axios from 'axios';
import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        username: state.auth.username,
        loggedIn: state.auth.logged_in,
        token: state.auth.token
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
                    <input type="text" id="search_playlist" placeholder="Search playlist" onChange={this.onSearchInputChange} />
                    <div className="search_icon"></div>
                    {this.state.results.length ?
                        <ul className="results playlist_results" id="response-playlist">
                            {this.state.results.map(function (result) {
                                return <SearchPlaylistResult uri={result.uri} title={result.title}
                                                             description={result.description}/>
                            })}
                        </ul> : null }
                </div>
            </div>
        )
    },
    onSearchInputChange: function(e) {
        axios.get('http://localhost/playlists?q=' + e.target.value, {
               headers: {'Authorization': 'Bearer ' + this.props.token }
            }
        ).then(function (response) {
            if(response.data.playlists){
                this.setState({
                    results: response.data.playlists
                });
            }
        }.bind(this));
    }
});

module.exports = connect( mapStateToProps )(SearchPlaylistContainer)