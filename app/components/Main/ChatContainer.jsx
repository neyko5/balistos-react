var React = require('react');
import { connect } from 'react-redux';
import Chat from './Chat';
import ChatOnline from './ChatOnline';
import io from 'socket.io-client';
import { fetchMessages, sendMessage } from '../../actions'

//const socket = io('http://localhost:4000');

function mapStateToProps(state) {
    return {
        messages: state.chat.messages,
        playlist: 'neykoshits'
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendMessage: (message, playlist) => {
            dispatch(sendMessage(message, playlist));
        },
        fetchMessages: () => {
            dispatch(fetchMessages());
        }
    }
}

var ChatContainer = React.createClass({
    componentWillMount() {
        this.props.fetchMessages();
    },
    render: function() {
        const { dispatch, sendMessage } = this.props;
        return (
            <div className="right-sidebar col-lg-5 col-md-6 col-sm-5 col-xs-12 left-gutter middle-gutter">
                <ChatOnline />
                <Chat {...this.props} sendMessage={sendMessage} />
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)