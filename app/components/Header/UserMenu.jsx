import React from 'react';

const UserMenu = props => {
    if(props.loggedIn){
        return (    
            <div className="menu">
                <div className="menu-button open-create" onClick={props.onOpenCreatePlaylistClick} >New playlist</div>
                <div className="user" onClick={props.onOpenLogoutClick} >
                    <img src={require("../../img/user.png")} />
                    <div className="text">Hello</div>
                    <div className="username">{props.username}</div>
                    <div className="arrow_down"></div>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="menu">
                <div className="menu-button border-left" onClick={props.onOpenLoginClick}>Log in</div>
                <div className="menu-button open-register" onClick={props.onOpenRegisterClick}>Register</div>
            </div>
        )
    } 
}

module.exports = UserMenu;