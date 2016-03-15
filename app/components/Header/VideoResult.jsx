var React = require('react');

function VideoResult(props){
    return (
        <li data-title={props.title} data-image={props.image} title={"Add " + props.title + " to playlist"} id={"video-" + props.id } onClick={props.onItemClick.bind(this, props.id)}>
            <img src={props.image} />
            <div className="title">{props.title}</div>
        </li>
    );
};

export default VideoResult;