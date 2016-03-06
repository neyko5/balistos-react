import React from 'react';
import UserMenu from './UserMenu';
import HeaderContainer from './HeaderContainer';
import LogOut from './LogOut';
import CreatePlaylist from './CreatePlaylist';
import Login from './Login';
import Register from './Register';
import SearchVideo from './SearchVideo';

var Header = React.createClass({
  getInitialState: function(){
    return {
        showLogin: false,
        showCreatePlaylist: false,
        showLogOut: false,
        showRegister: false
    }
  },
  onLoginClick: function(e){
      this.setState({
        showLogin: !this.state.showLogin
      })
  },
  onRegisterClick: function(e){
      this.setState({
        showRegister: !this.state.showRegister
      })
  },
  onCreatePlaylistClick: function(e){
      this.setState({
        showCreatePlaylist: !this.state.showCreatePlaylist
      })
  },
  onLogOutClick: function(e){
      this.setState({
        showLogOut: !this.state.showLogOut
      })
  },
  render: function() {
    return (    
        <HeaderContainer>
            <UserMenu 
              onLoginClick={this.onLoginClick}
              onRegisterClick={this.onRegisterClick}
              onCreatePlaylistClick={this.onCreatePlaylistClick}
              onLogOutClick={this.onLogOutClick} />
            <LogOut show={this.state.showLogOut}/>
            <CreatePlaylist show={this.state.showCreatePlaylist}/>
            <Login show={this.state.showLogin} />
            <Register show={this.state.showRegister}/>
            {this.props.search ? <SearchVideo  /> : false}
        </HeaderContainer>
    )
  }
});

module.exports = Header;