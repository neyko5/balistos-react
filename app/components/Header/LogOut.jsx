import React from 'react';

var LogOut = function(props){
    return (	
		<div className={"dropdown small "+ (props.open?"":"hidden")} id="logout" >
            <a href="/logout" className="button green logout">Log Out</a>
        </div>
    );
}

module.exports = LogOut;