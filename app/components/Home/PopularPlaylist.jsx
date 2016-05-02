function PopularPlaylist(props){
    return (
        <a href={"/playlist/" + props.data.uri} className="play-list">
            <div className="number" >{props.data.number}</div>
            <div className="square">
                <div className="title">{props.data.title}</div>
                <div className="created">created by <span className="black">{props.data.creator}</span></div>
            </div>
        </a>
    );
};

module.exports = PopularPlaylist;
