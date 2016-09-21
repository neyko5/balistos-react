import { Component, PropTypes } from 'react'
import Header from '../Header/Header';
import Footer from '../Footer';
import VideoListContainer from './VideoListContainer';
import VideoPlayerContainer from './VideoPlayerContainer';
import ChatContainer from './ChatContainer';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchPlaylist } from '../../actions';
import io from 'socket.io-client'
let socket = io('http://localhost:3000');

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        videos: state.playlist.videos,
        playlist_id: state.playlist.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchVideos: (id) => {
            dispatch(fetchPlaylist(id));
        },
        socketAction: (action) => {
            dispatch(action);
        }
    }
}

var Playlist =  React.createClass({
    componentDidMount: function(){
        let playlist = this.props.playlist;
        this.props.fetchVideos(this.props.playlist);
        socket.emit("join", playlist);
        console.log("JOINING: " + playlist);
        socket.on('action', (action) => this.props.socketAction(action));

    },
    componentWillUnmount: function(){
      console.log("LEAVING: " + this.props.playlist);
      socket.emit("leave", this.props.playlist);
    },
    render: function (){
        return (
            <main>
                <div className="container">
                    <VideoPlayerContainer videos={this.props.videos} />
                    <VideoListContainer videos={this.props.videos} />
                    <ChatContainer playlist={this.props.playlist} playlist_id={this.props.playlist_id}/>
                </div>
            </main>
        );
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
