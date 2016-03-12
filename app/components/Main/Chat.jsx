var React = require('react');
import ChatMessage from './ChatMessage';
import { receiveRawMessage, sendMessage } from '../../actions'
import { connect } from 'react-redux';



var Chat = React.createClass({
	componentDidMount: function(){
		const { socket, dispatch } = this.props;
		socket.emit('message', "lej ga lej ga");
		socket.on('message', msg =>
	        console.log(msg)
	    );
	},
	render: function() {
		let message;
		console.log(this.props);
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
                <div className="send">
                    <form id="chat-form" role="form" onSubmit={e => {
		                e.preventDefault()
		                if (!message.value.trim()) {
		                  return
		                }
		                this.props.sendMessage(message.value, this.props.playlist)
		                message.value = ''
		              }}>
                        <textarea name="message" placeholder="Send a message" ref={node => { message = node }}></textarea>
                        <button type="submit" className="button green chat">
                            <i className="icon message"></i>
                            Chat
                        </button>
                    </form>
                </div>
            </div>
		);
	}

});

export default Chat;