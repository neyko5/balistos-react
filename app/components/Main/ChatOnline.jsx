let ChatOnline = (props) => {
    console.log(props);
    return (
        <div className="users">
            <div className="header">
                <div className="title">Users online</div>
                <div className="number">{props.users.length}</div>
            </div>
            <div className="body">
                {props.users.map((user) => {
                   return <div className={"user " + (user.username === props.username?"green":"grey")} key={user.username}>{user.username}</div>
                })}
            </div>
        </div>
    );
}

module.exports = ChatOnline;
