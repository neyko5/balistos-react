let VideoResult = (props) =>{
    return (
        <li onClick={props.onItemClick} className={props.active?"active":""}>
            <img src={props.image} />
            <div className="title">{props.title}</div>
        </li>
    );
};

export default VideoResult;
