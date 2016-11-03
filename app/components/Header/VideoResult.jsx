let VideoResult = (props) =>{
    return (
        <li onClick={props.onItemClick}>
            <img src={props.image} />
            <div className="title">{props.title}</div>
        </li>
    );
};

export default VideoResult;
