import { Component, PropTypes } from 'react'
import Header from '../Header/Header';
import Footer from '../Footer';
import VideoListContainer from './VideoListContainer';
import VideoPlayerContainer from './VideoPlayerContainer';
import ChatContainer from './ChatContainer';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchPlaylist } from '../../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        videos: state.playlist.videos,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchVideos: () => {
            dispatch(fetchPlaylist());
        }
    }
}

var Playlist =  React.createClass({
    componentDidMount: function(){
        this.props.fetchVideos();
    },
    render: function (){
        return (
            <main>
                <div className="container">
                    <VideoPlayerContainer videos={this.props.videos} />
                    <VideoListContainer videos={this.props.videos} />
                    <ChatContainer />
                </div>
            </main>
        );
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
