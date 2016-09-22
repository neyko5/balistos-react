let LogOut = (props) => {
    return (
        <div className={"dropdown small "+ (props.open?"":"hidden")} id="logout" >
            <button className="button green logout" onClick={props.onLogoutClick} >Log Out</button>
        </div>
    );
}

module.exports = LogOut;
