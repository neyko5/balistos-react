import React from 'react';
let VideoResult = (props) =>{
    return (
        <li onClick={props.onItemClick} className={props.active?"active":""}>
            <img src={props.image} alt={props.title} />
            <div className="title">{props.title}</div>
        </li>
    );
};

export default VideoResult;
