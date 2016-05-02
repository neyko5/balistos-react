import React from 'react';

function Footer(props){
    return (
        <footer>
            <div className="container">
                <a href="https://www.youtube.com" target="_blank" className="youtube" alt="Powered by YouTube"></a>
                <a href="/privacy" target="_blank" className="privacy">Privacy policy</a>
                <div className="copyright">&copy; Balistos 2016</div>
            </div>
        </footer>
    )
}


module.exports = Footer;
