import React from 'react';

function HeaderContainer(props){
    return (	
    	<header>
            <div className="container">
                <h1 className="logo">Balistos</h1>
                {props.children}
            </div>
            <div className="clearfix"></div>
        </header>
    )    
};

module.exports = HeaderContainer;
