import {Link} from 'react-router';

let PopularPlaylist = (props) => {
    return (
        <Link to={"/playlist/" + props.data.id} className="play-list">
            <div className="number" >{props.index + 1}</div>
            <div className="square">
                <div className="title">{props.data.title}</div>
                <div className="created">created by <span className="black">{props.data.user.username}</span></div>
            </div>
        </Link>
    );
};

module.exports = PopularPlaylist;
