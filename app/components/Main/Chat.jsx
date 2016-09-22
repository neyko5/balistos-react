import ChatMessage from './ChatMessage';
import ChatForm from './ChatForm';

let Chat = (props) => {
    return (
        <div className="box">
            <div className="header">
                <i className="icon chat"></i>
                <div className="title">Chat with your buddies</div>
            </div>
            <div className="chatbox">
                {props.messages.map(function(message){
                    return <ChatMessage user={message.user.username} message={message.message} key={message.id}/>
                })}
            </div>
            <ChatForm sendMessage={props.sendMessage} />
        </div>
    );
};

export default Chat;
