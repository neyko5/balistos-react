import React from 'react';
import { connect } from 'react-redux';
import { likeVideo, deleteVideo } from '../../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        user_id: state.auth.user_id
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        likeVideo: (value) => {
            dispatch(likeVideo(ownProps.video.id, value));
        },
        deleteVideo: (video_id) => {
            dispatch(deleteVideo(video_id));
        }
    }
}

var VideoListItem = React.createClass({
    deleteCurrentVideo: function() {
        this.props.deleteVideo(this.props.video.id);
    },
    render: function() {
        let upLike = this.props.video.likes.some((like) => like.user_id === this.props.user_id && like.value === 1);
        let downLike = this.props.video.likes.some((like) => like.user_id === this.props.user_id && like.value === -1);
        let likeCount = this.props.video.likes.reduce((total, like) => total + like.value, 0);
        return (
            <div className="playlist_item">
                {this.props.user_id?<div className="vote">
                    <div className={"up " + (upLike?"active":"")} onClick={() => this.props.likeVideo(upLike?0:1)} title={this.props.video.likes.filter(like => like.value === 1).map(like => like.user.username).join(', ')}></div>
                    <div className="number">{likeCount}</div>
                    <div className={"down " + (downLike?"active":"")} onClick={() => this.props.likeVideo(downLike?0:-1)} title={this.props.video.likes.filter(like => like.value === -1).map(like => like.user.username).join(', ')}></div>
                </div>:
                <div className="vote">
                    <div className="number full">{likeCount}</div>
                </div>}
                <img src={"https://img.youtube.com/vi/" + this.props.video.video.youtube_id + "/0.jpg"} alt={this.props.video.title} />
                <div className="info">
                    <a className="title" target="_blank" title={"Open in YouTube"} href={"https://www.youtube.com/watch?v=" + this.props.video.video.youtube_id} >{this.props.video.video.title}</a>
                    <div className="addedby">added by <span className="black">{this.props.video.user.username}</span></div>
                </div>
                {this.props.user_id?<div className="delete-column">
                    <div className="delete" onClick={this.deleteCurrentVideo}></div>
                </div>:null}
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoListItem);
