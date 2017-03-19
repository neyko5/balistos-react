import React from 'react';
import { Link } from 'react-router'

let SearchPlaylistResult = (props) => {
    return (
        <Link to={"/playlist/" + props.result.id }>
            <div className="title">{props.result.title}</div>
            <div className="description">{props.result.description}</div>
        </Link>
    )
}

module.exports = SearchPlaylistResult;
