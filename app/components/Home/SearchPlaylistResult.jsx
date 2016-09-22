import React from 'react';
import { Link } from 'react-router'

let SearchPlaylistResult = (props) => {
    return (
        <Link to={"/playlist/" + props.id }>
            <div className="title">{props.title}</div>
            <div className="description">{props.description}</div>
        </Link>
    )
}

module.exports = SearchPlaylistResult;
