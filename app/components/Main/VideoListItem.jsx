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
                <div className="vote">
                    <div className={"up " + (upLike?"active":"")} onClick={() => this.props.likeVideo(upLike?0:1)}></div>
                    <div className="number">{likeCount}</div>
                    <div className={"down " + (downLike?"active":"")} onClick={() => this.props.likeVideo(downLike?0:-1)}></div>
                </div>
                <img src={"http://img.youtube.com/vi/" + this.props.video.video.youtube_id + "/0.jpg"}/>
                <div className="info">
                    <div className="title" >{this.props.video.video.title}</div>
                    <div className="addedby">added by <span className="black">{this.props.video.user.username}</span></div>
                </div>
                <div className="delete-column">
                    <div className="delete" onClick={this.deleteCurrentVideo}></div>
                </div>
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoListItem);
