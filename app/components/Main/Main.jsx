import React from 'react';
import Header from '../Header/Header';
import VideoListContainer from './VideoListContainer';
import VideoPlayer from './VideoPlayer';
import ChatContainer from './ChatContainer';
import axios from 'axios';
import { connect } from 'react-redux';
import { changePlaylist } from '../../actions'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changePlaylist: (playlist) => {
            dispatch(changePlaylist(playlist));
        }
    }
}

var Main = React.createClass({
      getVideos: function(){
            return axios.get('http://localhost/').then(function(videos){
                return videos.data;
        });
      },  
    getInitialState: function() {
        return {
            videos: []
        };
    },
    componentDidMount: function(){
        this.getVideos().then(function(videos){
            this.setState({
                videos: videos
            });
        }.bind(this)); 
        const { changePlaylist } = this.props;
        changePlaylist(this.props.params.playlistUri);
    },
    getFirstVideo: function(){
        if(this.state.videos){
            return {
                id: null,
                title: "Loading..."
            }
        }
        else{
            return this.state.videos[0];
        }
    },
    render: function() {
        console.log(this.props);
        return (
            <div className="full-height"> 
                <Header search={true} />
                <main>
                    <div className="container">
                        <VideoPlayer video={this.getFirstVideo} />
                        <VideoListContainer videos={this.state.videos}/>
                        <div className="right-sidebar col-lg-5 col-md-6 col-sm-5 col-xs-12 left-gutter middle-gutter">
                            <div className="users">
                                <div className="header">
                                    <div className="title">Users online</div>
                                    <div className="number">0</div>
                                </div>
                                <div className="body">
                                    <div className="user green"></div>
                                </div>
                            </div>
                            <ChatContainer />
                        </div>
                    </div>
                </main>
            </div>
        );
    }
});    

export default connect(mapDispatchToProps)(Main)