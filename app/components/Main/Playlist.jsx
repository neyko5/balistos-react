import { Component, PropTypes } from 'react'
import VideoListContainer from './VideoListContainer';
import VideoPlayer from './VideoPlayer';
import ChatContainer from './ChatContainer';
import { connect } from 'react-redux';
import { fetchPlaylist, sendHeartbeat, finishVideo, deleteVideo } from '../../actions';
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
        },
        finishVideo: (video_id) => {
            dispatch(finishVideo(video_id));
        },
        deleteVideo: (video_id) => {
            dispatch(deleteVideo(video_id));
        }
    }
}

var Playlist =  React.createClass({
    componentDidMount: function(){
        this.initPlaylist();
        socket.on('action', (action) => {
            console.log("socket", action);
            this.props.socketAction(action)
        });
    },
    componentDidUpdate(prevProps) {
        if(this.props.id !== prevProps.id){
            socket.emit("leave", "playlist_" + prevProps.id);
            this.initPlaylist();
        }
    },
    initPlaylist: function() {
        this.props.fetchVideos(this.props.id);
        socket.emit("join", "playlist_" + this.props.id);
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
                    <VideoPlayer current={this.props.playlist.current} finishVideo={this.props.finishVideo} deleteVideo={this.props.deleteVideo} />
                    <VideoListContainer playlist={this.props.playlist} />
                    <ChatContainer playlist={this.props.playlist} />
                </div>
            </main>
        );
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
