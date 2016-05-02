import { connect } from 'react-redux';
import Chat from './Chat';
import ChatOnline from './ChatOnline';
import io from 'socket.io-client';
import { fetchMessages, sendMessage } from '../../actions'

//const socket = io('http://localhost:4000');

function mapStateToProps(state) {
    return {
        messages: state.playlist.messages,
        playlist: 'neykoshits'
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendMessage: (message, playlist) => {
            dispatch(sendMessage(message, playlist));
        }
    }
}

var ChatContainer = React.createClass({
    render: function() {
        const { dispatch, sendMessage } = this.props;
        return (
            <div className="right-sidebar col-lg-5 col-md-6 col-sm-5 col-xs-12 left-gutter middle-gutter">
                <ChatOnline />
                <Chat messages={this.props.messages} sendMessage={sendMessage} />
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
