import React from 'react';
import { connect } from 'react-redux';
import { addVideo, getRelatedVideos } from '../../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        user_id: state.auth.user_id,
        id: state.playlist.id
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addVideo: () => {
            dispatch(addVideo(ownProps.video.id.videoId, ownProps.video.snippet.title, ownProps.id));
            dispatch(getRelatedVideos(ownProps.video.id.videoId));
        },
    }
}

var RelatedVideoItem = React.createClass({
    render: function() {
        return (
            <div className="playlist_item">
                <img src={"https://img.youtube.com/vi/" + this.props.video.id.videoId + "/0.jpg"} alt={this.props.video.snippet.title}/>
                <div className="info">
                    <a className="title" target="_blank" title={"Open in YouTube"} href={"https://www.youtube.com/watch?v=" + this.props.video.id.videoId} >{this.props.video.snippet.title}</a>
                </div>
                <button className="button green chat" onClick={this.props.addVideo}>
                    Add
                </button>
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RelatedVideoItem);
