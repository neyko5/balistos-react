import UserMenu from './UserMenu';
import HeaderContainer from './HeaderContainer';
import LogOut from './LogOut';
import CreatePlaylist from './CreatePlaylist';
import Login from './Login';
import Register from './Register';
import SearchVideo from './SearchVideo';
import { connect } from 'react-redux';
import { toggleLoginWindow, toggleCreatePlaylistWindow, toggleRegisterWindow, toggleLogoutWindow, logOut, createPlaylist } from '../../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        username: state.auth.username,
        loggedIn: state.auth.logged_in,
        loginOpen: state.windows.login_open,
        registerOpen: state.windows.register_open,
        logoutOpen: state.windows.logout_open,
        createPlaylistOpen: state.windows.create_playlist_open
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onOpenLoginClick: () => {
            dispatch(toggleLoginWindow());
        },
        onOpenRegisterClick: () => {
            dispatch(toggleRegisterWindow());
        },
        onOpenLogoutClick: () => {
            dispatch(toggleLogoutWindow());
        },
        onOpenCreatePlaylistClick: () => {
             dispatch(toggleCreatePlaylistWindow());
        },
        onLogoutClick: () => {
             dispatch(logOut());
        },
        onCreatePlaylistSubmit: (title, description) => {
             dispatch(createPlaylist(title, description));
        }
    }
}

var Header = React.createClass({
    render: function(){
      if(this.props.loggedIn){
          return (
            <HeaderContainer>
                <UserMenu onOpenLogoutClick={this.props.onOpenLogoutClick} onOpenCreatePlaylistClick={this.props.onOpenCreatePlaylistClick} username={this.props.username} loggedIn={this.props.loggedIn} search={this.props.search}/>
                <LogOut open={this.props.logoutOpen} onLogoutClick={this.props.onLogoutClick} />
                <CreatePlaylist open={this.props.createPlaylistOpen} onCreatePlaylistSubmit={this.props.onCreatePlaylistSubmit}/>
                {this.props.search ? <SearchVideo  /> : false}
            </HeaderContainer>
          )
      }
      else{
          return(
              <HeaderContainer onLogoClick="">
                  <UserMenu search={this.props.search} onOpenLoginClick={this.props.onOpenLoginClick} onOpenRegisterClick={this.props.onOpenRegisterClick} username={this.props.username} loggedIn={this.props.loggedIn} />
                  <Login  open={this.props.loginOpen} />
                  <Register open={this.props.registerOpen} />
              </HeaderContainer>
          )
      }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)
