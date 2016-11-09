import { connect } from 'react-redux';
import Chat from './Chat';
import ChatOnline from './ChatOnline';
import { sendMessage } from '../../actions'

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
            <div className="chat-container col-lg-12 col-md-12 col-sm-5 col-xs-12 no-gutter">
                {this.props.users?<ChatOnline users={this.props.users} username={this.props.username} />:undefined}
                <Chat messages={this.props.playlist.messages} sendMessage={this.props.sendMessage} username={this.props.username} />
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
