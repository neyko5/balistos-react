import { Link } from 'react-router'

function HeaderContainer(props){
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1 className="logo" >Balistos</h1>
                </Link>
                {props.children}
            </div>
            <div className="clearfix"></div>
        </header>
    )
};

module.exports = HeaderContainer;
