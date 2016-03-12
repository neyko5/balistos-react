import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer';
import SearchPlaylistContainer from './SearchPlaylistContainer';
import PopularPlaylistContainer from './PopularPlaylistContainer';

var Home = React.createClass({
    render: function() {
        return (
            <div className="full-height"> 
                <Header search={false} />
                <main className="background">
                    <div className="container">
                        <div className="col-lg-12">
                            <h1>Share your music taste with your friends!</h1>
                            <SearchPlaylistContainer />
                            <div className="row homeback">
                                <div className="col-lg-6 col-md-6">
                                    <div className="presentation">
                                        <h2>What is Balistos?</h2>
                                        <div className="text">Balistos is a simple application that uses the power of YouTube to let you share your music taste with your friends or people with the same ideas. Balistos lets you add music videos you like to the common playlist, where all connected users can listen to them together and vote up the ones they like.</div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="presentation">
                                        <h2>How do I use Balistos?</h2>
                                        <div className="text">Simple! You may search all the playlists and select the one you like by simply clicking on it. To be able to use full functionality of Balistos such as adding songs and voting you are required to register an account. If you don't like any of the playlist you may also create your own and share it with your friends. If you want to make it exclusive for your friends, make sure you protect it with password.</div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div  className="popular">
                                        <div className="icon-note"></div>
                                        <h3>Popular playlists</h3>
                                    </div>
                                </div>
                                <PopularPlaylistContainer />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
});

module.exports = Home;