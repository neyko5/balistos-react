import { connect } from 'react-redux';
import Chat from './Chat';
import ChatOnline from './ChatOnline';
import { fetchMessages, sendMessage } from '../../actions'

//const socket = io('http://localhost:4000');

function mapStateToProps(state) {
    return {
        messages: state.playlist.messages,
        users: state.playlist.users,
        username: state.auth.username
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendMessage: (message) => {
            dispatch(sendMessage(message, ownProps.id));
        }
    }
}

var ChatContainer = React.createClass({
    render: function() {
        return (
            <div className="right-sidebar col-lg-5 col-md-6 col-sm-5 col-xs-12 left-gutter middle-gutter">
                <ChatOnline users={this.props.users} username={this.props.username} />
                <Chat messages={this.props.playlist.messages} sendMessage={this.props.sendMessage} />
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
