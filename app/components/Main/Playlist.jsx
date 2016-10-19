import { Component, PropTypes } from 'react'
import Header from '../Header/Header';
import Footer from '../Footer';
import VideoListContainer from './VideoListContainer';
import VideoPlayerContainer from './VideoPlayerContainer';
import ChatContainer from './ChatContainer';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchPlaylist, sendHeartbeat } from '../../actions';
import io from 'socket.io-client'
let socket = io('http://localhost:3000');

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        playlist: state.playlist,
        username: state.auth.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchVideos: (id) => {
            dispatch(fetchPlaylist(id));
        },
        socketAction: (action) => {
            dispatch(action);
        },
        heartbeat: (username, playlist) => {
           dispatch(sendHeartbeat(username, playlist));
        }
    }
}

var Playlist =  React.createClass({
    componentDidMount: function(){
        this.props.fetchVideos(this.props.id);
        socket.emit("join", "playlist_" + this.props.id);
        socket.on('action', (action) => {
          console.log(action);
          this.props.socketAction(action)
        });
        this.heartbeat();
    },
    heartbeat: function() {
      this.props.heartbeat(this.props.username, this.props.id);
      setTimeout(this.heartbeat, 30000);
    },
    componentWillUnmount: function(){
      socket.emit("leave", "playlist_" + this.props.id);
    },
    render: function (){
        return (
            <main>
                <div className="container">
                    <VideoPlayerContainer playlist={this.props.playlist} />
                    <VideoListContainer playlist={this.props.playlist}/>
                    <ChatContainer playlist={this.props.playlist} />
                </div>
            </main>
        );
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
