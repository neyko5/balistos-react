import React, { Component, PropTypes } from 'react'
import Header from '../Header/Header';
import Footer from '../Footer';
import VideoListContainer from './VideoListContainer';
import VideoPlayerContainer from './VideoPlayerContainer';
import ChatContainer from './ChatContainer';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchVideos } from '../../actions'



class Playlist extends Component {
    componentDidMount(){
        const { dispatch, playlist } = this.props
        dispatch(fetchVideos(playlist));
    }
    render (){
        return (
            <main>
                <div className="container">
                    <VideoPlayerContainer video="sdsd" />
                    <VideoListContainer videos={this.props.videos} />
                    <ChatContainer />
                </div>
            </main>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        videos: state.playlist.videos
    }
}

export default connect(mapStateToProps)(Playlist);