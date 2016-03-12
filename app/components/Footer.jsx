import React from 'react';

var Footer = React.createClass({
    render: function() {
        return (    
            <footer>
                <div className="container">
                    <a href="https://www.youtube.com" target="_blank" className="youtube" alt="Powered by YouTube"></a>
                    <a href="/privacy" target="_blank" className="privacy">Privacy policy</a>
                    <div className="copyright">&copy; Balistos 2014</div>
                </div>
            </footer>
        )
    }
});

module.exports = Footer;