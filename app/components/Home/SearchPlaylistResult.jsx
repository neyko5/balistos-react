import React from 'react';
import { Link } from 'react-router'

const SearchPlaylistResult = (props) => {
    return (    
        <Link to={"/playlist/" + props.uri }>
        	<div className="title">{props.title}</div>
        	<div className="description">{props.description}</div>
        </Link>
    )
}

module.exports = SearchPlaylistResult;