var React = require('react');
import ChatMessage from './ChatMessage';
import ChatForm from './ChatForm';
import { receiveRawMessage, sendMessage } from '../../actions'
import { connect } from 'react-redux';

var Chat = React.createClass({
    componentDidMount: function(){
    },
    render: function() {
        return (
            <div className="box">
                <div className="header">
                    <i className="icon chat"></i>
                    <div className="title">Chat with your buddies</div>
                </div>
                <div className="chatbox">
                    {this.props.messages.map(function(message){
                        return <ChatMessage id_user={message.id_user} message={message.message} key={message.id}/>
                    })}
                </div>
                <ChatForm />
            </div>
        );
    }
});

export default Chat;